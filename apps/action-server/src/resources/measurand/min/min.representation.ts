import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { RepresentationService } from "../../../services/representation-service";

export class RepresentationServiceMin extends RepresentationService {
  public static getTextualRepresentation(measurandData: ILUBWMeasurandData): IRepresentationData {
    return {
      value: `Der Minimalwert der Messart ${measurandData.measurand} für die Station ${
        measurandData.station
      } beträgt am ${format(new Date(measurandData.measurandData[0].times[0]), "P", { locale: de })}: ${Math.min(
        ...measurandData.measurandData[0].values,
      )}`,
      type: REPRESENTATION_TYPE.Text,
    };
  }
}
