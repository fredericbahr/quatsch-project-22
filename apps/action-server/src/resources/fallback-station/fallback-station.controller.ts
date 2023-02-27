import { COMPONENT_LIST, ILUBWData, IQanaryAnnotation, IQanaryMessage, RasaRequest, RasaResponse } from "shared";

import { VerificationError } from "../../errors/VerificationError";
import { ErrorHandlingService } from "../../services/error-handling-service";
import { AnnotationExtractionService } from "../../services/extraction-service.ts/extract-annotation-service";
import { StoringService } from "../../services/storing-service";
import { LUBWDataTransformationService } from "../../services/transformation-service";
import { startQanaryPipeline } from "../../utils/start-pipeline";

export const fallbackStationRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body.tracker?.latest_message?.text ?? "";
  const intent: string | undefined = req.body.next_action;
  const senderId: string | undefined = req.body.sender_id;

  const componentlist: Array<COMPONENT_LIST> = [COMPONENT_LIST.PATTERN_MATCHING_STATION];

  try {
    const qanaryMessage: IQanaryMessage = await startQanaryPipeline(question, componentlist);

    const annotations: Array<IQanaryAnnotation> = await AnnotationExtractionService.extractAnnotations(qanaryMessage);

    const lubwData: Partial<ILUBWData> = LUBWDataTransformationService.getTransformedLUBWData(annotations);

    StoringService.storeCurrentState({ senderId, intent, lubwData });
  } catch (error: unknown) {
    if (error instanceof VerificationError) {
      return ErrorHandlingService.handleVerificationError(res, error);
    }
    console.error(error);
    return ErrorHandlingService.handleDefaultError(res);
  }
};
