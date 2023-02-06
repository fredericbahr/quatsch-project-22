import { Domain, ICalculation, IMeasurand, IRepresentation, IStation } from "qanary-lubw-data";

import { isEmptyArray } from "./utils";

/**
 * Gets the prefixes for the SPARQL query
 * @returns needed prefixes for the SPARQL query
 */
export const getPrefixes = (): string => {
  return `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX identity: <http://www.identity.org/ontologies/identity.owl>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos>
`;
};

/**
 * Transforms the domains to class definitions for the SPARQL query
 * @param domains the domains of lubw data to transform
 * @returns transformed domains as class definitions
 */
export const getClassDefinitions = (domains: Domain[]): string => {
  let classDefinitions = "";
  domains.forEach((domain) => {
    classDefinitions += `<urn:${domain} a rdfs:Class> .\n`;
  });

  return classDefinitions;
};

/**
 * Transforms the stations to triples for the SPARQL query
 * @param stations the lubw stations to transform
 * @returns transformed stations as triples
 */
export const getStationTriples = (stations: IStation[]): string => {
  if (isEmptyArray(stations)) {
    return "";
  }

  const stationTriples = stations.map((station) => {
    return `<urn:${station.id} a <urn:station> ;
  identity:id \\"${station.id}\\" ;
  rdfs:label \\"${station.label}\\" ;
  geo:lat \\"${station.lat}\\" ;
  geo:long \\"${station.long}\\" .`;
  });

  return stationTriples.join("\n");
};

/**
 * Transforms the measurands to triples for the SPARQL query
 * @param measurands the lubw measurands to transform
 * @returns transformed measurands as triples
 */
export const getMeasurandTriples = (measurands: IMeasurand[]): string => {
  if (isEmptyArray(measurands)) {
    return "";
  }

  const measurandTriples = measurands.map((measurand) => {
    return `<urn:${measurand.id} a <urn:measurand> ;
  identity:id \\"${measurand.id}\\" ;
  rdfs:label \\"${measurand.label}\\" .`;
  });

  return measurandTriples.join("\n");
};

/**
 * Transforms the calculations to triples for the SPARQL query
 * @param calculations the lubw calculations to transform
 * @returns transformed calculations as triples
 */
export const getCalculationTriples = (calculations: ICalculation[]): string => {
  if (isEmptyArray(calculations)) {
    return "";
  }

  const calculationTriples = calculations.map((calculation) => {
    return `<urn:${calculation.id} a <urn:calculation> ;
  identity:id \\"${calculation.id}\\" ;
  rdfs:label \\"${calculation.label}\\" .`;
  });

  return calculationTriples.join("\n");
};

/**
 * Transforms the representations to triples for the SPARQL query
 * @param representations the lubw representations to transform
 * @returns transformed representations as triples
 */
export const getRepresentationTriples = (representations: IRepresentation[]): string => {
  if (isEmptyArray(representations)) {
    return "";
  }

  const representationTriples = representations.map((representation) => {
    return `<urn:${representation.id} a <urn:representation> ;
  identity:id \\"${representation.id}\\" ;
  rdfs:label \\"${representation.label}\\" .`;
  });

  return representationTriples.join("\n");
};

/**
 * Generates the additional triples from the lubw data for seeding the Qnaray knowledge base
 * @param domains the domains to generate triples for
 * @param stations the stations to generate triples for
 * @param measurands the measurands to generate triples for
 * @param calculations the calculations to generate triples for
 * @param representations the representations to generate triples for
 * @returns generated addition triples
 */
export const generateAdditionalTriples = ({
  domains = [Domain.Station, Domain.Measurand, Domain.Calculation, Domain.Representation],
  stations = [],
  measurands = [],
  calculations = [],
  representations = [],
}: {
  domains?: Domain[];
  stations?: IStation[];
  measurands?: IMeasurand[];
  calculations?: ICalculation[];
  representations?: IRepresentation[];
}): string => {
  return `
${getPrefixes()}
${getClassDefinitions(domains)}
${getStationTriples(stations)}
${getMeasurandTriples(measurands)}
${getCalculationTriples(calculations)}
${getRepresentationTriples(representations)}
  `;
};
