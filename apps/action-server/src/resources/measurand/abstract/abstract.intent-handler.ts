import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { ResponseService } from "../../../services/response-service";
import { AbstractRepresentation } from "./abstract.representation";

/**
 * The intent handler for the intent `action_measurand_complete`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const abstractIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  try {
    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = AbstractRepresentation.getRepresentation(measurandData);

    return ResponseService.getResponseByRepresentation(representation);
  } catch {
    throw new Error("Something went wrong while determining the answer to the question.");
  }
};
