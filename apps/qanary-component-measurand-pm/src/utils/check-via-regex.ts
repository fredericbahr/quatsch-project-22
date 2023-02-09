import { IMeasurand } from "qanary-lubw-data";

/**
 * Checks if a measurand label or id is contained in a question
 * @param question the question to check whether it contains the measurand
 * @param measurand the measurand to check if it is contained in the question
 */
export const checkMeasurandViaRegex = (question: string, measurand: IMeasurand): void => {
  const measurandLabelRegex = new RegExp(measurand.label, "id");
  const measurandIdRegex = new RegExp(measurand.id, "id");

  const labelRegexResult = measurandLabelRegex.exec(question);
  const idRegexResult = measurandIdRegex.exec(question);

  if (labelRegexResult) {
    console.log(`Found measurand ${labelRegexResult[0]} at index: ${labelRegexResult.index}`, labelRegexResult);
  }

  if (idRegexResult) {
    console.log(`Found measurand ${idRegexResult[0]} at index: ${idRegexResult.index}`, labelRegexResult);
  }
};
