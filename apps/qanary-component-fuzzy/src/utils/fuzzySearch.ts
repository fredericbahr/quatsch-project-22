import Fuse from "fuse.js";
import { createAnnotationInKnowledgeGraph, getDomainInstances, IAnnotationInformation } from "qanary-component-helpers";
import { annotationTypesMap, Domain, DomainType, IQanaryMessage } from "shared";

import pkg from "../../package.json";
import { AnnotationOfInstance } from "../query/annotationOfInstance";

/**
 * Creates a Fuse.js fuzzy search object with provided data.
 * The location of the match in the string doesn't matter for the score.
 * And a score threshold of 0.6 is used (resulting in inverted threshold of 0.4).
 * @param domainInstances list of domain instances to use as data for fuzzy search
 * @returns a new fuse instance with loaded data
 */
const createFuse = <T extends Domain>(domainInstances: Array<DomainType<T>>): Fuse<DomainType<T>> => {
  const options = {
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.6,
    keys: ["id", "label"],
  };

  return new Fuse(domainInstances, options);
};

/**
 * Extracts a substring from the question based on the annotation start and end.
 * @param question the question to extract the substring from
 * @param annotation the annotation from a ner component
 * @returns extracted substring
 */
const extractQuestionSubstringFromAnnotation = (question: string, annotation: AnnotationOfInstance): string => {
  return question.substring(annotation.start, annotation.end);
};

/**
 * Inverts the provided fuse confidence score.
 * Because in fuse 0 indicates a perfect match and 1 a total mismatch,
 * the score needs to be inverted for a use with other qanary components.
 * @param fuseScore the score generated from a fuse fuzzy compare
 * @returns inverted confidence score
 */
const invertFuseScore = (fuseScore: number): number => {
  return 1 - fuseScore;
};

/**
 * Searches for a domain instance within a question via fuse fuzzy search.
 * @param question the question to search in
 * @param annotation the annotation from a ner component
 * @param domainInstance the domain instance to search for
 * @returns an annotation if the domain instance was found, null otherwise
 */
const searchViaFuzzy = <T extends Domain>(
  question: string,
  annotation: AnnotationOfInstance,
  domainInstances: Array<DomainType<T>>,
): IAnnotationInformation | null => {
  const FIRST_RESULT_INDEX = 0;
  const fuse = createFuse<T>(domainInstances);

  const annotatedString = extractQuestionSubstringFromAnnotation(question, annotation);
  const results = fuse.search(annotatedString);
  const result = results[FIRST_RESULT_INDEX];

  if (!result) {
    return null;
  }

  console.log(`Found domainInstance ${result}`, result);

  return {
    value: result.item.id,
    confidence: invertFuseScore(result.score),
    range: {
      start: annotation.start,
      end: annotation.end,
    },
  } as IAnnotationInformation;
};

/**
 * Checks if annotated part of question containes one of the domain instances of annotation domain.
 * Writes results as new annotations to triple store.
 * @param message the qanary message
 * @param question the question to check whether it contains a domain instance
 * @param annotation the annotation from a ner component
 */
export const searchForDomainInstances = async (
  message: IQanaryMessage,
  question: string,
  annotation: AnnotationOfInstance,
): Promise<void> => {
  /** the known instances of the defined domain */
  const domainInstances: DomainType<typeof annotation.domain>[] = await getDomainInstances(annotation.domain, message);

  const fuzzyAnnotation = searchViaFuzzy<typeof annotation.domain>(question, annotation, domainInstances);

  if (fuzzyAnnotation) {
    await createAnnotationInKnowledgeGraph({
      message,
      componentName: pkg.name,
      annotation: fuzzyAnnotation,
      annotationType: annotationTypesMap.get(annotation.domain),
    });
  }
};
