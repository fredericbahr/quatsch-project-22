import { IBase } from "./base";

/** The type of lubw measurand data entries */
export interface IMeasurand extends IBase {
  /** the threshold of the measurand, unit: µg/m³ */
  threshold?: Array<number>;
}
