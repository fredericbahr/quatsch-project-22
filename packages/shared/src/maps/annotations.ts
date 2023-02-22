import { Domain } from "../enums/domains";

/**
 * A mapping of domains to their corresponding annotation types within the qanary knowledge graph
 */
export const annotationTypes: Map<Domain, string> = new Map([
  [Domain.Measurand, "qa:AnnotationOfMeasurand"],
  [Domain.Station, "qa:AnnotationOfStation"],
  [Domain.Calculation, "qa:AnnotationOfCalculation"],
  [Domain.Representation, "qa:AnnotationOfRepresentation"],
  [Domain.Time, "qa:AnnotationOfTime"],
]);
