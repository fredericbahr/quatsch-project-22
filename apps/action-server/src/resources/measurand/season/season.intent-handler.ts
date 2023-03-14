import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { ResponseService } from "../../../services/response-service";
import { RepresentationServiceSeason } from "./season.representation";

/**
 * The intent handler for the intent `action_measurand_season`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const seasonIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

  const representation: IRepresentationData = RepresentationServiceSeason.getRepresentation(measurandData);

  return ResponseService.getResponseByRepresentation(representation);
};
