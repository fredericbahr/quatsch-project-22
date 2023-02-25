import { ILUBWData, ILUBWMeasurandData, IRepresentationData, SuccessRasaResponse } from "shared";

import { LUBWQueryService } from "../../../services/lubw-query-service";
import { RepresentationService } from "../../../services/representation-service";
import { getResponseForMeasurandAir } from "./utils/get-response";

/**
 * The intent handler for the intent `action_context_air_measurand`.
 * @param lubwData the gathered LUBW data
 * @returns the answer to the question
 */
export const measurandAirIntentHandler = async (lubwData: ILUBWData): Promise<SuccessRasaResponse> => {
  const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

  const representation: IRepresentationData = RepresentationService.getRepresentation(measurandData);

  const response: SuccessRasaResponse = getResponseForMeasurandAir(representation);

  return response;
};
