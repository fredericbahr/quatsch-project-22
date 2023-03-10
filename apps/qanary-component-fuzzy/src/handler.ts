import { IQanaryComponentMessageHandler } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";
import { IQanaryMessage } from "shared";

import { AnnotationOfInstance, getAnnotationsOfInstance } from "./query/annotationOfInstance";
import { searchForDomainInstances } from "./utils/fuzzySearch";

/**
 * An event handler for incoming messages of the Qanary pipeline
 * Exported only for testing purposes
 * @param message incoming qanary pipeline message
 */
export const handler: IQanaryComponentMessageHandler = async (message: IQanaryMessage) => {
  const pipelineOrigin: string | undefined = process.env["QANARY_ORIGIN"];

  /** the question to check if it contains domain instances */
  const question: string | null = await getQuestion(message, pipelineOrigin);

  if (!question) {
    throw new Error("Could not get question from qanary pipeline");
  }

  const annotationsOfInstance: Array<AnnotationOfInstance> | null = await getAnnotationsOfInstance(message);

  if (!annotationsOfInstance) {
    return message;
  }

  for (const annotationOfInstance of annotationsOfInstance) {
    await searchForDomainInstances(message, question, annotationOfInstance);
  }

  return message;
};
