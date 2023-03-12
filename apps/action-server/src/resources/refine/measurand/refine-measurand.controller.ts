import {
  COMPONENT,
  IIntentHandler,
  ILUBWData,
  ILUBWDataKey,
  IQanaryAnnotation,
  IQanaryMessage,
  RasaRequest,
  RasaResponse,
  SuccessRasaResponse,
} from "shared";
import { AnnotationTypes } from "shared/dist/enums/annotations";

import { NoIntentHandlerError } from "../../../errors/NoIntentHandlerError";
import { VerificationError } from "../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../services/extraction-service/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";
import { startQanaryPipeline } from "../../../utils/start-pipeline";

/**
 * Handler for refining the measurand if a validation error occurred
 * @param req the request object
 * @param res the response object
 */
export const refineMeasurandRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body.tracker?.latest_message?.text ?? "";
  const senderId: string | undefined = req.body.sender_id;

  const componentlist: Array<COMPONENT> = [
    COMPONENT.PATTERN_MATCHING_MEASURAND,
    COMPONENT.NER_AUTOML,
    COMPONENT.FUZZY_NER,
  ];

  try {
    const qanaryMessage: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAnnotationsByType(
      qanaryMessage,
      AnnotationTypes.Measurand,
    );

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.getTransformedLUBWData(annotations, false);

    const measurand: string | undefined = lubwData.measurand;

    await StoringService.changeStateEntry(senderId, ILUBWDataKey.Measurand, measurand);

    const stateLUBWData: Partial<ILUBWData> | null = await StoringService.getCurrentState(senderId);

    /** Throws an {@link VerificationError} if verification fails */
    const verifiedLUBWData: ILUBWData = VerificationService.verifyLUBWData(stateLUBWData);

    /** Throws an {@link NoIntentHandlerError} if no intent handler was found */
    const intentHandler: IIntentHandler = await IntentHandlerFindingService.findIntentHandlerInState(senderId);

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

    return ErrorHandlingService.handleDefaultError(res);
  }
};
