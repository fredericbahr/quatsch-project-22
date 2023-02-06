import { IBase } from "./base";

/** Interface for the data entries of an lubw station */
export interface IStation extends IBase {
  /** the longitude of the station */
  long: number;
  /** the latitude of the station */
  lat: number;
}
