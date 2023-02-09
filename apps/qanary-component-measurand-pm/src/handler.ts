import { IQanaryComponentMessageHandler, IQanaryMessage } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";
import { IMeasurand } from "qanary-lubw-data";

import { checkMeasurandViaRegex } from "./utils/check-via-regex";
import { getMeasurands } from "./utils/getMeasurands";

/**
 * The event handler for the qanary component measurand pm
 * It gets the question and know measurands from the knowledge graph and checks via a regular expression if the question contains a measurand
 * If a measurand is found, it is added to the knowledge graph as an annotation
 * @param message incoming qanary pipeline message
 */
export const handler: IQanaryComponentMessageHandler = async (message: IQanaryMessage) => {
  const pipelineOrigin: string | undefined = process.env["QANARY_ORIGIN"];
  const measurands: IMeasurand[] = await getMeasurands(message);

  const question: string | null = await getQuestion(message, pipelineOrigin);

  if (!question) {
    throw new Error("Could not get question from qanary pipeline");
  }

  for (const measurand of measurands) {
    checkMeasurandViaRegex(question, measurand);
  }

  return message;
};
