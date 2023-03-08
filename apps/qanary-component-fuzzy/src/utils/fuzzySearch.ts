import Fuse from "fuse.js";
import { createAnnotationInKnowledgeGraph, IAnnotationInformation } from "qanary-component-helpers";
import { annotationTypesMap, Domain, IQanaryMessage } from "shared";

import pkg from "../../package.json";
import { DomainType } from "../handler";
import { AnnotationOfInstance } from "../query/annotationOfInstance";
import { getDomainInstances } from "./getDomainInstances";

/**
 * Creates a Fuse.js fuzzy search object with provided data.
 * @param domainInstances list of domain instances to use as data for fuzzy search
 * @returns a new fuse instance with loaded data
 */
const createFuse = <T extends Domain>(domainInstances: Array<DomainType<T>>) => {
  const options = {
    includeScore: true,
    keys: ["id", "label"],
  };

  return new Fuse(domainInstances, options);
};

/**
 * Extracts a substring from the question based on the annotation start and end.
 * @param question the question to extract the substring from
 * @param annotationOfInstance the annotation from a ner component
 * @returns extracted substring
 */
const extractQuestionSubstringFromAnnotation = (
  question: string,
  annotationOfInstance: AnnotationOfInstance,
): string => {
  return question.substring(annotationOfInstance.start, annotationOfInstance.end);
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
 * @param annotationOfInstance the annotation from a ner component
 * @param domainInstance the domain instance to search for
 * @returns an annotation if the domain instance was found, null otherwise
 */
const searchViaFuzzy = <T extends Domain>(
  question: string,
  annotationOfInstance: AnnotationOfInstance,
  domainInstances: Array<DomainType<T>>,
): IAnnotationInformation | null => {
  const FIRST_RESULT_INDEX = 0;
  const fuse = createFuse(domainInstances);

  const annotatedString = extractQuestionSubstringFromAnnotation(question, annotationOfInstance);
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
      start: annotationOfInstance.start,
      end: annotationOfInstance.end,
    },
  } as IAnnotationInformation;
};

/**
 * Checks if annotated part of question containes one of the domain instances of annotation domain. Writes results as new annotations to triple store.
 * @param message the qanary message
 * @param question the question to check whether it contains a domain instance
 * @param annotationOfInstance the annotation from a ner component
 */
export const searchForDomainInstances = async (
  message: IQanaryMessage,
  question: string,
  annotationOfInstance: AnnotationOfInstance,
): Promise<void> => {
  /** the known instances of the defined domain */
  const domainInstances: DomainType<typeof annotationOfInstance.domain>[] = await getDomainInstances(
    annotationOfInstance.domain,
    message,
  );

  const annotation = searchViaFuzzy(question, annotationOfInstance, domainInstances);

  if (annotation) {
    await createAnnotationInKnowledgeGraph({
      message,
      componentName: pkg.name,
      annotation,
      annotationType: annotationTypesMap.get(annotationOfInstance.domain),
    });
  }
};
