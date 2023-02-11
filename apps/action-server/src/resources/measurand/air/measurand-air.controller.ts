import { IQanaryMessage } from "qanary-component-core";

import { COMPONENT_LIST } from "../../../enums/component-list";
import { IQanaryAnnotation } from "../../../interfaces/annotations";
import { RasaRequest, RasaResponse } from "../../../interfaces/http";
import { AnnotationExtractionService } from "../../../services/extract-annotation-service";
import { ILUBWMeasurandData, LUBWQueryService } from "../../../services/lubw-query-service";
import { RepresentationService } from "../../../services/representation-service";
import { startQanaryPipeline } from "../../../utils/start-pipeline";

/**
 * Handles an error gracefully by returning a response to the user.
 * @param res the response object
 */
const handleMeasurandAirRequestError = (res: RasaResponse) => {
  res.json({
    responses: [
      {
        text: "Beim bearbeiten der Anfrage ist etwas schief gelaufen. Ich kann diese nicht beantworten.",
        response: "",
      },
    ],
  });
};

/**
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  let lubwQueryService: LUBWQueryService;

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

    lubwQueryService = new LUBWQueryService(annotations);

    const measurandData: ILUBWMeasurandData = await lubwQueryService.queryLUBWAPI();

    const representation = RepresentationService.getTextualRepresentation(measurandData);

    res.json({
      responses: [
        {
          text: "Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet.",
          response: "",
        },
      ],
    });
    res.end();
  } catch (error) {
    console.error(error);
    return handleMeasurandAirRequestError(res);
  }
};
