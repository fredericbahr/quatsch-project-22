import { getEndpoint, getInGraph, selectSparql } from "qanary-component-helpers";
import { Literal } from "rdf-js";
import { Domain, IQanaryMessage } from "shared";

import { DomainType } from "../handler";

// TODO: move to helpers packages to use here and in pm component

/**
 * A raw domain instance returned by the SPARQL query
 */
interface IRawDomainInstance {
  label: Literal;
  id: Literal;
}

/**
 * Gets the instances for given lubw domain from the knowledge graph by querying the SPARQL endpoint
 * @param domain the lubw domain to get the domain instances for
 * @param message the qanary message provided by the pipeline with the endpoint and graph
 * @returns the instances for given lubw domain found in the knowledge graph
 */
export const getDomainInstances = async <T extends Domain>(
  domain: Domain,
  message: IQanaryMessage,
): Promise<DomainType<T>[]> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";

  const domainInstanceQuery = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

SELECT ?label ?id
FROM <${inGraph}>
WHERE {
    ?domainInstance a <urn:${domain}> .
    ?domainInstance rdfs:label ?label .
    ?domainInstance dc:identifier ?id .
}`;

  const rawDomainInstances: IRawDomainInstance[] = await selectSparql<IRawDomainInstance>(
    endpointUrl,
    domainInstanceQuery,
  );

  return rawDomainInstances.map(
    (rawDomainInstance: IRawDomainInstance) =>
      ({
        label: rawDomainInstance.label.value,
        id: rawDomainInstance.id.value,
      } as DomainType<T>),
  );
};
