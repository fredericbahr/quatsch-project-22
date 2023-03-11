import { IQanaryComponentMessageHandler } from "qanary-component-core";
import { getDomainInstances, getQuestion } from "qanary-component-helpers";
import { Domain, DomainType, IQanaryMessage } from "shared";

import { isDomain } from "./utils/check-domain";
import { searchForDomainInstances } from "./utils/search";

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
