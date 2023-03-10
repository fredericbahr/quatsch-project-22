import { ICalculation, IMeasurand, IRepresentation, IStation } from "qanary-lubw-data";

import { Domain } from "../enums/domains";

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
