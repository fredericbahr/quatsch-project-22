import { ILUBWMeasurandData } from "./lubw-query-service";

/**
 * This enum represents the different types of representations.
 */
export enum REPRESENTATION_TYPE {
  TEXT = "text",
  CHART = "chart",
  TABLE = "table",
}

/**
 * This interface represents the data of a representation.
 */
export interface IRepresentationData {
  /** the value of the representation */
  value: string | URL;
  /** the type of the representation */
  type: REPRESENTATION_TYPE;
}

/**
 * This service provides methods to transform lubw measurand data into different representations.
 */
export class RepresentationService {
  /**
   * Gets a textual representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a textual representation
   * @returns the textual representation of the given measurand data
   */
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: "test",
      type: REPRESENTATION_TYPE.TEXT,
    };
  }

  /**
   * Gets a chart representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a chart representation
   * @returns the chart representation of the given measurand data
   */
  public static getChartRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: new URL(""),
      type: REPRESENTATION_TYPE.CHART,
    };
  }

  /**
   * Gets a table representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a table representation
   * @returns the table representation of the given measurand data
   */
  public static getTableRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: new URL(""),
      type: REPRESENTATION_TYPE.TABLE,
    };
  }
}
