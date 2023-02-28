import {
  defaultLUBWData,
  IIntentHandler,
  ILUBWData,
  INTENTS,
  RasaRequest,
  RasaResponse,
  SuccessRasaResponse,
} from "shared";

import { NoIntentHandlerError } from "../../../errors/NoIntentHandlerError";
import { VerificationError } from "../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";

/**
 * Handler for finding the maximal value
 * @param req the request object
 * @param res the response object
 */
export const maxRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const intent: string | undefined = req.body.next_action;
  const senderId: string | undefined = req.body.sender_id;

  try {
    const stateLUBWData: Partial<ILUBWData> | null = await StoringService.getCurrentState(senderId);

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.mergeWithDefaults(
      stateLUBWData,
      defaultLUBWData,
    );

    await StoringService.storeCurrentState({ senderId, intent, lubwData });

    /** Throws an {@link VerificationError} if verification fails */
    const verifiedLUBWData: ILUBWData = VerificationService.verifyLUBWData(lubwData);

    /** Throws an {@link NoIntentHandlerError} if no intent handler was found */
    const maxHandler: IIntentHandler = IntentHandlerFindingService.findIntentHandlerByIntent(intent as INTENTS);

    const response: SuccessRasaResponse = await maxHandler(verifiedLUBWData);
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
