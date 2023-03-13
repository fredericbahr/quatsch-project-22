import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { ResponseService } from "../../../services/response-service";
import { RepresentationServiceThreshold } from "./treshold.representation";

/**
 * The intent handler for the intent `action_measurand_threshold`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const thresholdIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  try {
    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = RepresentationServiceThreshold.getRepresentation(measurandData);

    return ResponseService.getResponseByRepresentation(representation);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while determining the answer to the question.");
  }
};
