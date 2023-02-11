import { ILUBWMeasurandData } from "./lubw-query-service";

/**
 * This service provides methods to transform lubw measurand data into different representations.
 */
export class RepresentationService {
  /**
   * Gets a textual representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a textual representation
   * @returns the textual representation of the given measurand data
   */
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): string {
    return "";
  }

  /**
   * Gets a chart representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a chart representation
   * @returns the chart representation of the given measurand data
   */
  public static getChartRepresentation(measurandData: ILUBWMeasurandData): URL {
    return new URL("");
  }

  /**
   * Gets a table representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a table representation
   * @returns the table representation of the given measurand data
   */
  public static getTableRepresentation(measurandData: ILUBWMeasurandData): URL {
    return new URL("");
  }
}
