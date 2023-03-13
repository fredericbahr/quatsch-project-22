import { CALCULATION_TYPE } from "../enums/calculation";
import { REPRESENTATION_TYPE } from "../enums/representation";

/** Keys of the ILUBWData object */
export enum ILUBWDataKey {
  Station = "station",
  Measurand = "measurand",
  Representation = "representation",
  Calculation = "calculation",
  Time = "time",
}

/**
 * The interim internal representation of the LUBW data needed to query the database.
 * TODO: could be multiple instances of the same domain (e.g. multiple stations)
 */
export interface ILUBWData extends ILUBWDefaultData {
  [ILUBWDataKey.Station]: string;
  [ILUBWDataKey.Measurand]: string;
}

/** Default lubw data type */
export interface ILUBWDefaultData {
  [ILUBWDataKey.Calculation]: CALCULATION_TYPE;
  [ILUBWDataKey.Representation]: REPRESENTATION_TYPE;
  [ILUBWDataKey.Time]: ILUBWDefaultDataTime;
}

/** Default lubw time data type */
export interface ILUBWDefaultDataTime {
  /**
   * The earliest date in a time span
   */
  start: Date;
  /**
   * The latest date in a time span
   */
  end: Date;
}

/**
 * The interim internal format of the LUBW data aggregated with the measurand data from the lubw api.
 */
export interface ILUBWMeasurandData extends ILUBWData {
  /** fetched measurands of the lubw api */
  measurandData: any;
}
