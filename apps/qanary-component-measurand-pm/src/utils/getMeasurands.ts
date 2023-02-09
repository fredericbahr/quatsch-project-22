import { IQanaryMessage } from "qanary-component-core";
import { getEndpoint, getInGraph, selectSparql } from "qanary-component-helpers";
import { IMeasurand } from "qanary-lubw-data";

/**
 * A rew measurand returned by the SPARQL query
 */
interface IRawMeasurand {
  label: {
    value: string;
    datatype: unknown;
    language: string;
  };
  id: {
    value: string;
    datatype: unknown;
    language: string;
  };
}

/**
 * Gets the measurands from the knowledge graph by querying the SPARQL endpoint
 * @param message the qanary message provided by the pipeline with the endpoint and graph
 * @returns the measurands found in the knowledge graph
 */
export const getMeasurands = async (message: IQanaryMessage): Promise<IMeasurand[]> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";

  const measurandQuery = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

SELECT ?label ?id
FROM <${inGraph}>
WHERE {
    ?measurand a <urn:measurand> .
    ?measurand rdfs:label ?label .
    ?measurand dc:identifier ?id .
}
`;

  const rawMeasurands: IRawMeasurand[] = await selectSparql<IRawMeasurand>(endpointUrl, measurandQuery);

  const measurands: IMeasurand[] = rawMeasurands.map((rawMeasurand: IRawMeasurand) => ({
    label: rawMeasurand.label.value,
    id: rawMeasurand.id.value,
  }));

  return measurands;
};
