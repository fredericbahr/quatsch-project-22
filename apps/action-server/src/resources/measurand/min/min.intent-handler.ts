import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { ResponseService } from "../../../services/response-service";
import { RepresentationServiceMin } from "./min.representation";

/**
 * The intent handler for the intent `action_find_max`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const minIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  try {
    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = RepresentationServiceMin.getRepresentation(measurandData);

    return ResponseService.getResponseByRepresentation(representation);
  } catch {
    throw new Error("Something went wrong while determining the answer to the question.");
  }
};
