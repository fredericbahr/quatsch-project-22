/**
 * The interim internal representation of the LUBW data needed to query the database.
 * TODO: could be multiple instances of the same domain (e.g. multiple stations)
 */
export interface ILUBWData {
  /** the station id*/
  station: string;
  /** the measurand id */
  measurand: string;
  /** the representation format */
  representation: string;
  /** the calculation type */
  calculation: string;
  /** the time as number of days ago*/
  time: string;
}

/**
 * The interim internal format of the LUBW data aggregated with the measurand data from the lubw api.
 */
export interface ILUBWMeasurandData extends ILUBWData {
  /** fetched measurands of the lubw api */
  measurandData: any;
}
