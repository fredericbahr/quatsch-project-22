import { format } from "date-fns";
import { de } from "date-fns/locale";
import { IMeasurand, measurands } from "qanary-lubw-data";
import { ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { AbstractRepresentation } from "../abstract/abstract.representation";

/**
 * This service provides methods to transform lubw measurand data into different representations for the season intent.
 */
export class RepresentationServiceSeason extends AbstractRepresentation {
  /**
   * Gets a textual representation of the given measurand data.
   * @param measurandData the lubw measurand data to transform into a textual representation
   * @returns the textual representation of the given measurand data
   */
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: [
        `Der Wert der Messart ${measurandData.measurand}`,
        `für die Station ${measurandData.station}`,
        `am ${format(new Date(measurandData.time.end), "P", { locale: de })} beträgt:`,
        `${this.getLastValue(measurandData)}`,
        "\n",
        `Der durchschnittliche Wert für die Station ${measurandData.station} der letzten drei Monate beträgt:`,
        `${this.calculate(measurandData)}`,
      ].join(" "),
      type: REPRESENTATION_TYPE.Text,
    };
  }
}
