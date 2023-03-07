import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { ResponseService } from "../../../services/response-service";
import { ThresholdRepresentationService } from "./treshold.representation";

/**
 * The intent handler for the intent `action_context_air_measurand`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const measurandThresholdIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  try {
    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = ThresholdRepresentationService.getRepresentation(measurandData);

    return ResponseService.getResponseByRepresentation(representation);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while determining the answer to the question.");
  }
};
