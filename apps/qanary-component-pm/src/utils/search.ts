import { createAnnotationInKnowledgeGraph, IAnnotationInformation } from "qanary-component-helpers";
import { annotationTypesMap, Domain, DomainType, IQanaryMessage } from "shared";

/**
 * Searches for a domain instance within a question via a regular expression
 * @param question the question to search in
 * @param regex the regular expression to search for
 * @param domainInstance the domain instance to search for
 * @returns an annotation if the domain instance was found, null otherwise
 */
const searchViaRegex = <T extends Domain>(
  question: string,
  regex: RegExp,
  domainInstance: DomainType<T>,
): IAnnotationInformation | null => {
  const CONFIDENCE = 1;
  const INDICES_INDEX = 0;
  const START_INDEX = 0;
  const END_INDEX = 1;

  const result: RegExpExecArray | null = regex.exec(question);

  if (!result) {
    return null;
  }

  console.log(`Found domainInstance ${result[0]} at index: ${result.index}`, result);

  return {
    value: domainInstance.id,
    confidence: CONFIDENCE,
    range: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      start: (result as any).indices[INDICES_INDEX][START_INDEX],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      end: (result as any).indices[INDICES_INDEX][END_INDEX],
    },
  } as IAnnotationInformation;
};

/**
 * Search/Checks if a domain instance label or id is contained in a question
 * @param question the question to check whether it contains the domain isntance
 * @param domain the lubw domain the domain instance belongs to, needed for the annotatedBy property
 * @param domainInstance the domain instance to check if it is contained in the question
 * @param message the qanary message
 */
export const searchForDomainInstances = async <T extends Domain>(
  message: IQanaryMessage,
  question: string,
  domain: Domain,
  domainInstance: DomainType<T>,
): Promise<void> => {
  const annotations: Array<IAnnotationInformation | null> = [];
  const domainInstanceLabelRegex = new RegExp(domainInstance.label, "id");
  const domainInstanceIdRegex = new RegExp(domainInstance.id, "id");

  annotations.push(searchViaRegex(question, domainInstanceLabelRegex, domainInstance));
  annotations.push(searchViaRegex(question, domainInstanceIdRegex, domainInstance));

  for (const annotation of annotations) {
    if (annotation) {
      await createAnnotationInKnowledgeGraph({
        message,
        componentName: `${domain}-pattern-matching`,
        annotation,
        annotationType: annotationTypesMap.get(domain),
      });
    }
  }
};
