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
export type ILUBWData = Record<ILUBWDataKey, string>;

/** Default lubw data type */
export type ILUBWDefaultData = Record<Extract<ILUBWDataKey, "calculation" | "representation" | "time">, string>;

/**
 * The interim internal format of the LUBW data aggregated with the measurand data from the lubw api.
 */
export interface ILUBWMeasurandData extends ILUBWData {
  /** fetched measurands of the lubw api */
  measurandData: any;
}
