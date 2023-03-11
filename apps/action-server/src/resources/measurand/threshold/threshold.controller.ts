import {
  COMPONENT_LIST,
  IIntentHandler,
  ILUBWData,
  INTENTS,
  IQanaryAnnotation,
  IQanaryMessage,
  IState,
  RasaRequest,
  RasaResponse,
  SuccessRasaResponse,
} from "shared";

import { NoIntentHandlerError } from "../../../errors/NoIntentHandlerError";
import { VerificationError } from "../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../services/extraction-service/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";
import { startQanaryPipeline } from "../../../utils/start-pipeline";
import { mergeStateAndLubwData } from "./utils/merge-state-lubw-data";

/**
 * Handles the intent/action of `action_measurand_treshold` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandThresholdRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body.tracker?.latest_message?.text ?? "";
  const intent: string | undefined = req.body.next_action;
  const senderId: string | undefined = req.body.sender_id;

  const componentlist: Array<COMPONENT_LIST> = [
    COMPONENT_LIST.PATTERN_MATCHING_STATION,
    COMPONENT_LIST.PATTERN_MATCHING_MEASURAND,
    COMPONENT_LIST.PATTERN_MATCHING_REPRESENTATION,
    COMPONENT_LIST.LANGUAGE_RECOGNITION,
    COMPONENT_LIST.TIME_RECOGNITION,
  ];

  try {
    const qanaryMessage: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAllAnnotations(
      qanaryMessage,
    );

    const storedState: Partial<IState> | null = await StoringService.getCurrentState(senderId);

    const shouldMergeWithDefaultState: boolean = storedState === null;

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.getTransformedLUBWData(
      annotations,
      shouldMergeWithDefaultState,
    );

    const mergedState: Partial<ILUBWData> = mergeStateAndLubwData(storedState, lubwData);

    await StoringService.storeCurrentState({ senderId, intent, lubwData: mergedState });

    /** Throws an {@link VerificationError} if verification fails */
    const verifiedLUBWData: ILUBWData = VerificationService.verifyLUBWData(mergedState);

    /** Throws an {@link NoIntentHandlerError} if no intent handler was found */
    const measurandThresholdHandler: IIntentHandler = IntentHandlerFindingService.findIntentHandlerByIntent(
      intent as INTENTS,
    );

    const response: SuccessRasaResponse = await measurandThresholdHandler(verifiedLUBWData);
    res.json(response);
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof VerificationError) {
      return ErrorHandlingService.handleVerificationError(res, error);
    }

    if (error instanceof NoIntentHandlerError) {
      return ErrorHandlingService.handleNoIntentHandlerError(res);
    }

    return ErrorHandlingService.handleDefaultError(res);
  }
};
