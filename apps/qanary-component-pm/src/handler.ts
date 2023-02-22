import { IQanaryComponentMessageHandler } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";
import { ICalculation, IMeasurand, IRepresentation, IStation } from "qanary-lubw-data";
import { Domain, IQanaryMessage } from "shared";

import { isDomain } from "./utils/check-domain";
import { getDomainInstances } from "./utils/getDomainInstances";
import { searchForDomainInstances } from "./utils/search";

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
 * The event handler for the qanary component generic pm
 * It gets the question and know domain instances from the knowledge graph and checks via a regular expression if the question contains a domain instance
 * If a domain instance is found within the question, it is added to the knowledge graph as an annotation
 * @param message incoming qanary pipeline message
 */
export const handler: IQanaryComponentMessageHandler = async (message: IQanaryMessage) => {
  /** the lubw domain we should do a pattern matching for  */
  const domain: Domain | undefined = process.env["LUBW_DOMAIN"] as Domain;
  const pipelineOrigin: string | undefined = process.env["QANARY_ORIGIN"];

  if (!isDomain(domain)) {
    throw new Error("Could not get correct domain from environment variable");
  }

  /** the know instances of the defined domain */
  const domainInstances: DomainType<typeof domain>[] = await getDomainInstances(domain, message);

  /** the question to check if it contains domain instances */
  const question: string | null = await getQuestion(message, pipelineOrigin);

  if (!question) {
    throw new Error("Could not get question from qanary pipeline");
  }

  for (const domainInstance of domainInstances) {
    await searchForDomainInstances(message, question, domain, domainInstance);
  }

  return message;
};
