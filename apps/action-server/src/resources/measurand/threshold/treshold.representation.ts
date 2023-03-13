import { format } from "date-fns";
import { de } from "date-fns/locale";
import { IMeasurand, measurands } from "qanary-lubw-data";
import { ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { AbstractRepresentation } from "../abstract/abstract.representation";

/**
 * This service provides methods to transform lubw measurand data into different representations for the threshold intent.
 */
export class RepresentationServiceThreshold extends AbstractRepresentation {
  /**
   * Gets a textual representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a textual representation
   * @returns the textual representation of the given measurand data
   */
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    const threshold: Array<number> | undefined = this.getThreshold(measurandData);

    if (!threshold) {
      return {
        value: [
          `Der ${measurandData.calculation}-Wert`,
          `der Messart ${measurandData.measurand}`,
          `für die Station ${measurandData.station}`,
          `beträgt am ${format(new Date(measurandData.measurandData[0].times[0]), "P", { locale: de })}:`,
          `${this.calculate(measurandData)}`,
          "\n",
          `Es liegen keine Grenzwerte für die Messart ${measurandData.measurand} vor.`,
        ].join(" "),
        type: REPRESENTATION_TYPE.Text,
      };
    }

    return {
      value: [
        `Der ${measurandData.calculation}-Wert`,
        `der Messart ${measurandData.measurand}`,
        `für die Station ${measurandData.station}`,
        `beträgt am ${format(new Date(measurandData.measurandData[0].times[0]), "P", { locale: de })}:`,
        `${this.calculate(measurandData)}`,
        "\n",
        this.getThresholdMessage(measurandData, threshold),
      ].join(" "),
      type: REPRESENTATION_TYPE.Text,
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
            datasets: this.getChartDataset(measurandData),
          },
          options: {
            title: {
              display: true,
              text: `Messart ${measurandData.measurand} für die Station ${measurandData.station} mit Grenzwerten`,
            },
          },
        })}`,
      ),
      type: REPRESENTATION_TYPE.Graph,
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
          title: `Messart ${measurandData.measurand} für die Station ${measurandData.station} mit Grenzwerten`,
          columns: this.getTableColumns(measurandData),
          dataSource: ["-", ...this.getTableSources(measurandData)],
        })}`,
      ),
      type: REPRESENTATION_TYPE.Table,
    };
  }

  /**
   * Whether the given measurand data is above the thresholds for the measurand.
   * @param measurandData the measurand data to check
   * @returns an array of booleans indicating whether the given measurand data is above the thresholds for the measurand
   */
  private static isAboveThreshold(measurandData: ILUBWMeasurandData): Array<boolean> {
    const measurandType: IMeasurand | undefined = measurands.find(
      (measurand) => measurand.id === measurandData.measurand,
    );

    if (!measurandType?.threshold) {
      return [false];
    }

    return measurandType.threshold.map((threshold: number) => {
      return measurandData.measurandData[0].values[0] > threshold;
    });
  }

  /**
   * Gets the threshold for the given measurand data.
   * @param measurandData the measurand data to get the threshold for
   * @returns the threshold for the given measurand data
   */
  private static getThreshold(measurandData: ILUBWMeasurandData): Array<number> | undefined {
    const measurandType: IMeasurand | undefined = measurands.find(
      (measurand) => measurand.id === measurandData.measurand,
    );

    if (!measurandType?.threshold) {
      return undefined;
    }

    return measurandType.threshold;
  }

  /**
   * Gets the threshold message for the given measurand data.
   * @param measurandData the measurand data to get the threshold message for
   * @param threshold the threshold for the measurand data
   * @returns the threshold message for the given measurand data
   */
  private static getThresholdMessage(measurandDate: ILUBWMeasurandData, thresholds: Array<number>): string {
    const isAboveThreshold: Array<boolean> = this.isAboveThreshold(measurandDate);

    if (thresholds.length === 1) {
      return `Der Grenzwert für die Messart ${measurandDate.measurand} beträgt ${
        thresholds[0]
      } µg/m³. Der aktuelle Wert liegt somit ${isAboveThreshold[0] ? "über" : "unter"} dem Grenzwert.`;
    }

    return thresholds
      .map((threshold: number, index: number) => {
        return `Der Grenzwert ${index + 1} für die Messart ${
          measurandDate.measurand
        } beträgt ${threshold} µg/m³. Der aktuelle Wert liegt somit ${
          isAboveThreshold[index] ? "über" : "unter"
        } dem Grenzwert.`;
      })
      .join("\n");
  }

  /**
   * Gets the char dataset for the given measurand data.
   * @param measurandData the measurand data to get the chart dataset for
   * @returns the chart dataset for the given measurand data
   */
  private static getChartDataset(measurandData: ILUBWMeasurandData): Array<any> {
    const defaultDataset = {
      label: measurandData.measurand,
      data: measurandData.measurandData[0].values,
      fill: false,
      borderColor: "green",
    };

    const thresholds: Array<number> | undefined = this.getThreshold(measurandData);

    if (!thresholds) {
      return [defaultDataset];
    }

    return [
      ...[defaultDataset],
      ...thresholds.map((threshold: number, index: number) => {
        return {
          label: `Grenzwert ${index + 1}`,
          data: measurandData.measurandData[0].values.map(() => threshold),
          fill: false,
          borderColor: this.getChartColor(index),
        };
      }),
    ];
  }

  /**
   * Gets a chart color for the given index.
   * @param index the index to get the chart color for
   * @returns the chart color for the given index
   */
  private static getChartColor(index: number): string {
    const colors = ["orange", "red", "blue", "yellow", "purple", "pink", "chartreuse", "cyan", "magenta", "olive"];

    return colors[index % colors.length];
  }

  private static getTableColumns(measurandData: ILUBWMeasurandData): Array<any> {
    const thresholds: Array<number> | undefined = this.getThreshold(measurandData);
    const defaultColumns = [
      {
        title: "Datum",
        dataIndex: "time",
      },
      {
        title: "Wert",
        dataIndex: "value",
        align: "center",
      },
    ];

    if (!thresholds) {
      return defaultColumns;
    }

    return [
      ...defaultColumns,
      ...thresholds.map((threshold: number, index: number) => {
        return {
          title: `Grenzwert ${index + 1}`,
          dataIndex: `threshold${index + 1}`,
          align: "center",
        };
      }),
    ];
  }

  /**
   * Gets the table sources for the given measurand data with the thresholds.
   * @param measurandData the measurand data to get the table sources for
   * @returns the table sources for the given measurand data with the thresholds
   */
  private static getTableSources(measurandData: ILUBWMeasurandData): Array<any> {
    const thresholds: Array<number> | undefined = this.getThreshold(measurandData);
    const defaultSources = measurandData.measurandData[0].times.map((time: number, index: number) => ({
      time: format(new Date(time), "P", { locale: de }),
      value: measurandData.measurandData[0].values[index],
    }));

    if (!thresholds) {
      return defaultSources;
    }

    return [
      ...measurandData.measurandData[0].times.map((time: number, index: number) => ({
        time: format(new Date(time), "P", { locale: de }),
        value: measurandData.measurandData[0].values[index],
        ...thresholds.reduce(
          (acc, threshold, index) => Object.assign(acc, { [`threshold${index + 1}`]: threshold }),
          {},
        ),
      })),
    ];
  }
}
