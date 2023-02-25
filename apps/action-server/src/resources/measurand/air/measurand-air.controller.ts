import {
  COMPONENT_LIST,
  IIntentHandler,
  ILUBWData,
  INTENTS,
  IQanaryAnnotation,
  IQanaryMessage,
  RasaRequest,
  RasaResponse,
  SuccessRasaResponse,
} from "shared";

import { VerificationError } from "../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../services/extraction-service.ts/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";
import { startQanaryPipeline } from "../../../utils/start-pipeline";

/**
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body.tracker?.latest_message?.text ?? "";
  const intent: string | undefined = req.body.next_action;
  const senderId: string | undefined = req.body.sender_id;

  const componentlist: Array<COMPONENT_LIST> = [
    COMPONENT_LIST.PATTERN_MATCHING_STATION,
    COMPONENT_LIST.PATTERN_MATCHING_MEASURAND,
    COMPONENT_LIST.PATTERN_MATCHING_CALCULATION,
    COMPONENT_LIST.PATTERN_MATCHING_REPRESENTATION,
    COMPONENT_LIST.LANGUAGE_RECOGNITION,
    COMPONENT_LIST.TIME_RECOGNITION,
  ];

  try {
    const qanaryMessage: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAnnotations(qanaryMessage);

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.getTransformedLUBWData(annotations);

    StoringService.storeCurrentState({ senderId, intent, lubwData });

    // throws {@link VerificationError} if verification fails
    const verifiedLUBWData: ILUBWData = VerificationService.verifyLUBWData(lubwData);

    const measurandAirHandler: IIntentHandler = IntentHandlerFindingService.findIntentHandler(intent as INTENTS);
    const response: SuccessRasaResponse = await measurandAirHandler(verifiedLUBWData);

    res.json(response);
  } catch (error: unknown) {
    if (error instanceof VerificationError) {
      return ErrorHandlingService.handleVerificationError(res, error);
    }
    console.error(error);
    return ErrorHandlingService.handleDefaultError(res);
  }
};
