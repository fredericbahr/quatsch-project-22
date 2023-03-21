import {
  COMPONENT,
  COMPONENT_LIST_ALL_RUN_SEQUENCE,
  IIntentHandler,
  ILUBWData,
  INTENTS,
  IQanaryAnnotation,
  IQanaryMessage,
  RasaRequest,
  RasaResponse,
  SuccessRasaResponse,
} from "shared";

import { EmptyResponseError } from "../../../errors/empty-response-error";
import { NoIntentHandlerError } from "../../../errors/no-intent-handler-error";
import { VerificationError } from "../../../errors/verification-error";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../services/extraction-service/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";
import { mergeStateAndLubwData } from "../../../utils/merge-state-lubw-data";
import { IRasaRequestDestruction, rasaRequestDestructor } from "../../../utils/rasa-request-destructor";
import { startQanaryPipeline } from "../../../utils/start-pipeline";

/**
 * Handles the intent/action of `action_measurand_complete` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 * @param enforcedLUBWData LUBW data that will be overwritten at the end of the process
 */
export const abstractRequestHandler = async (
  req: RasaRequest,
  res: RasaResponse,
  enforcedLUBWData: Partial<ILUBWData>,
) => {
  const { question, intent, senderId }: IRasaRequestDestruction = rasaRequestDestructor(req);

  const componentlist: Array<COMPONENT> = COMPONENT_LIST_ALL_RUN_SEQUENCE;

  try {
    const message: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAllAnnotations(message);

    const storedState: Partial<ILUBWData> | null = await StoringService.getCurrentState(senderId);

    const isStateEmpty: boolean = storedState === null;

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.getTransformedLUBWData(
      annotations,
      isStateEmpty,
    );

    const mergedState: Partial<ILUBWData> = {
      ...mergeStateAndLubwData(storedState, lubwData),
      ...enforcedLUBWData,
    };

    await StoringService.storeCurrentState({ senderId, intent, lubwData: mergedState });

    /** Throws an {@link VerificationError} if verification fails */
    const verifiedLUBWData: ILUBWData = VerificationService.verifyLUBWData(mergedState);

    /** Throws an {@link NoIntentHandlerError} if no intent handler was found */
    const intentHandler: IIntentHandler = IntentHandlerFindingService.findIntentHandlerByIntent(intent as INTENTS);

    const response: SuccessRasaResponse = await intentHandler(verifiedLUBWData);
    res.json(response);
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof VerificationError) {
      return ErrorHandlingService.handleVerificationError(res, error);
    }

    if (error instanceof NoIntentHandlerError) {
      return ErrorHandlingService.handleNoIntentHandlerError(res);
    }

    if (error instanceof EmptyResponseError) {
      return ErrorHandlingService.handleEmptyResponseError(res);
    }

    return ErrorHandlingService.handleDefaultError(res);
  }
};
