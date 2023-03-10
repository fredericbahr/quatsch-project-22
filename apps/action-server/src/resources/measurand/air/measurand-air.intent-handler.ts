import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { RepresentationService } from "../../../services/representation-service";
import { ResponseService } from "../../../services/response-service";

/**
 * The intent handler for the intent `action_context_air_measurand`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const measurandAirIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  try {
    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = RepresentationService.getRepresentation(measurandData);

    return ResponseService.getResponseByRepresentation(representation);
  } catch {
    throw new Error("Something went wrong while determining the answer to the question.");
  }
};
