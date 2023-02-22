import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

/**
 * This service provides methods to transform lubw measurand data into different representations.
 */
export class RepresentationService {
  /**
   * Gets a representation of the given measurand data based on the given representation inside the measurand data.
   * @default If no representation is given, a textual representation is returned.
   * @param measurandData the lubw measurand data to transform into a representation
   * @returns the representation of the given measurand data
   */
  public static getRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    switch (measurandData.representation) {
      case REPRESENTATION_TYPE.TEXT:
        return this.getTextualRepresentation(measurandData);
      case REPRESENTATION_TYPE.GRAPH:
        return this.getChartRepresentation(measurandData);
      case REPRESENTATION_TYPE.TABLE:
        return this.getTableRepresentation(measurandData);
      default:
        return this.getTextualRepresentation(measurandData);
    }
  }

  /**
   * Gets a textual representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a textual representation
   * @returns the textual representation of the given measurand data
   */
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: `Der Wert der Messart ${measurandData.measurand} für die Station ${
        measurandData.station
      } beträgt am ${format(new Date(measurandData.measurandData[0].times[0]), "P", { locale: de })} ${
        measurandData.measurandData[0].values[0]
      }`,
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
      value: new URL(
        `https://quickchart.io/chart?c=${JSON.stringify({
          type: "line",
          data: {
            labels: measurandData.measurandData[0].times.map((time: number) =>
              format(new Date(time), "P", { locale: de }),
            ),
            datasets: [
              {
                label: measurandData.measurand,
                data: measurandData.measurandData[0].values,
                fill: false,
                borderColor: "green",
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: `Messart ${measurandData.measurand} für die Station ${measurandData.station}`,
            },
          },
        })}`,
      ),
      type: REPRESENTATION_TYPE.GRAPH,
    };
  }

  /**
   * Gets a table representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a table representation
   * @returns the table representation of the given measurand data
   */
  public static getTableRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: new URL(
        `https://api.quickchart.io/v1/table?data=${JSON.stringify({
          title: `Messart ${measurandData.measurand} für die Station ${measurandData.station}`,
          columns: [
            {
              title: "Datum",
              dataIndex: "time",
            },
            {
              title: "Wert",
              dataIndex: "value",
            },
          ],
          dataSource: [
            "-",
            ...measurandData.measurandData[0].times.map((time: number, index: number) => ({
              time: format(new Date(time), "P", { locale: de }),
              value: measurandData.measurandData[0].values[index],
            })),
          ],
        })}`,
      ),
      type: REPRESENTATION_TYPE.TABLE,
    };
  }
}
