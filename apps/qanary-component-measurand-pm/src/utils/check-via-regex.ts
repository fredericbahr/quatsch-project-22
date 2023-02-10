import { IQanaryMessage } from "qanary-component-core";
import { createAnnotation, IQanaryAnnotation } from "qanary-component-helpers";
import { IMeasurand } from "qanary-lubw-data";

/**
 * Checks if a measurand label or id is contained in a question
 * @param question the question to check whether it contains the measurand
 * @param measurand the measurand to check if it is contained in the question
 * @param message the qanary message
 */
export const checkMeasurandViaRegex = async (
  message: IQanaryMessage,
  question: string,
  measurand: IMeasurand,
): Promise<void> => {
  const CONFIDENCE = 1;
  const INDICES_INDEX = 0;
  const START_INDEX = 0;
  const END_INDEX = 1;

  const measurandLabelRegex = new RegExp(measurand.label, "id");
  const measurandIdRegex = new RegExp(measurand.id, "id");

  const labelRegexResult = measurandLabelRegex.exec(question);
  const idRegexResult = measurandIdRegex.exec(question);

  if (labelRegexResult) {
    console.log(`Found measurand ${labelRegexResult[0]} at index: ${labelRegexResult.index}`, labelRegexResult);
    const annotation: IQanaryAnnotation = {
      value: measurand.id,
      confidence: CONFIDENCE,
      range: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        start: (labelRegexResult as any).indices[INDICES_INDEX][START_INDEX],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        end: (labelRegexResult as any).indices[INDICES_INDEX][END_INDEX],
      },
    };

    await createAnnotation(message, "measurand-pattern-matching", annotation);
  }

  if (idRegexResult) {
    console.log(`Found measurand ${idRegexResult[0]} at index: ${idRegexResult.index}`, idRegexResult);
    const annotation: IQanaryAnnotation = {
      value: measurand.id,
      confidence: 1,
      range: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        start: (idRegexResult as any).indices[INDICES_INDEX][START_INDEX],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        end: (idRegexResult as any).indices[INDICES_INDEX][END_INDEX],
      },
    };

    await createAnnotation(message, "measurand-pattern-matching", annotation);
  }
};
