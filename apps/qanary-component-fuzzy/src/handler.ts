import { IQanaryComponentMessageHandler } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";
import { ICalculation, IMeasurand, IRepresentation, IStation } from "qanary-lubw-data";
import { Domain, IQanaryMessage } from "shared";

import { AnnotationOfInstance, getAnnotationsOfInstance } from "./query/annotationOfInstance";
import { searchForDomainInstances } from "./utils/fuzzySearch";

// TODO: move generic type to shared for usage here and in pm component

/**
 * generic type for domains
 *
 * @example Measurand example
 * ```ts
 *  const example: DomainType<Domain.Measurand> = {
 *    id: "",
 *    label: ""
 *  }
 * ```
 *
 * @example Station example
 * ```ts
 *  const example: DomainType<Domain.Station> = {
 *    id: "",
 *    label: "",
 *    lat: NaN,
 *    long: NaN
 *  }
 * ```
 */
export type DomainType<T extends Domain> = T extends Domain.Measurand
  ? IMeasurand
  : T extends Domain.Station
  ? IStation
  : T extends Domain.Calculation
  ? ICalculation
  : T extends Domain.Representation
  ? IRepresentation
  : never;

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

  for (const annotationOfInstance of annotationsOfInstance) {
    await searchForDomainInstances(message, question, annotationOfInstance);
  }

  return message;
};
