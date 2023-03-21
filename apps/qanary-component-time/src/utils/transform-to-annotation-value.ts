import { ParsedResult } from "chrono-node";

import { transformToISOString } from "./transform-to-iso-string";

/**
 * Converts a ParsedResult into an annotation value of type RDF AnnotationOfTime, depending on the specified object a
 * time span or a time value is returned
 * @param parsedResult a found time span or a time value within the question
 */
export const transformToAnnotationValue = (parsedResult: ParsedResult): string => {
  return JSON.stringify({
    text: parsedResult.text,
    start: transformToISOString(parsedResult.start),
    end: transformToISOString(parsedResult.end),
  });
};
