import { REPRESENTATION_TYPE } from "../enums/representation";

/**
 * This interface represents the data of a representation.
 */
export interface IRepresentationData {
  /** the value of the representation */
  value: string | URL;
  /** the type of the representation */
  type: REPRESENTATION_TYPE;
}
