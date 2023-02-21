import { IQanaryMessage } from "qanary-component-core";

import { COMPONENT_LIST } from "../../../enums/component-list";
import { IQanaryAnnotation } from "../../../interfaces/annotations";
import { RasaRequest, RasaResponse } from "../../../interfaces/http";
import { AnnotationExtractionService } from "../../../services/extraction-service.ts/extract-annotation-service";
import { ILUBWMeasurandData, LUBWQueryService } from "../../../services/lubw-query-service";
import { IRepresentationData, RepresentationService } from "../../../services/representation-service";
import { ILUBWData, LUBWDataTransformationService } from "../../../services/transformation-service";
import { startQanaryPipeline } from "../../../utils/start-pipeline";
import { getResponseForMeasurandAir, ResponseForMeasurandAir } from "./utils/get-response";
import { handleMeasurandAirRequestError } from "./utils/handle-error";

/**
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body?.tracker?.latest_message?.text ?? "";

  const componentlist: Array<COMPONENT_LIST> = [
    COMPONENT_LIST.PATTERN_MATCHING_STATION,
    COMPONENT_LIST.PATTERN_MATCHING_MEASURAND,
    COMPONENT_LIST.PATTERN_MATCHING_CALCULATION,
    COMPONENT_LIST.PATTERN_MATCHING_REPRESENTATION,
  ];

  try {
    const qanaryMessage: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAnnotations(qanaryMessage);

    const lubwData: ILUBWData = LUBWDataTransformationService.getTransformedLUBWData(annotations);

    const measurandData: ILUBWMeasurandData = await LUBWQueryService.queryLUBWAPI(lubwData);

    const representation: IRepresentationData = RepresentationService.getRepresentation(measurandData);

    const response: ResponseForMeasurandAir = getResponseForMeasurandAir(representation);

    res.json(response);
  } catch (error) {
    console.error(error);
    return handleMeasurandAirRequestError(res);
  }
};
