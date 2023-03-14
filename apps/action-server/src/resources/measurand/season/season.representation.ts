import { format } from "date-fns";
import { de } from "date-fns/locale";
import { measurands, stations } from "qanary-lubw-data";
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
        `Der Wert`,
        `der Messart ${this.findLableById(measurandData.measurand, measurands)}`,
        `für die Station ${this.findLableById(measurandData.station, stations)}`,
        `am ${format(new Date(measurandData.time.end), "P", { locale: de })} beträgt:`,
        `${this.getLastValue(measurandData)} µg/m³`,
        "\n",
        `Der durchschnittliche Wert für die Station ${this.findLableById(
          measurandData.station,
          stations,
        )} der letzten drei Monate beträgt:`,
        `${this.calculate(measurandData)} µg/m³`,
      ].join(" "),
      type: REPRESENTATION_TYPE.Text,
    };
  }
}
