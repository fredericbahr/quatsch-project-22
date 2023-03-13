import { INTENTS, RasaRequest, RasaResponse } from "shared";

import { askAffirmationRequestHandler, fallbackRequestHandler } from "../fallback/default/fallback.controller";
import { completeRequestHandler } from "../measurand/complete/complete.controller";
import { maxRequestHandler } from "../measurand/max/max.controller";
import { minRequestHandler } from "../measurand/min/min.controller";
import { thresholdRequestHandler } from "../measurand/threshold/threshold.controller";
import { refineMeasurandRequestHandler } from "../refine/measurand/refine-measurand.controller";
import { refineStationRequestHandler } from "../refine/station/refine-station.controller";

/**
 * Handles the webhook request from Rasa and calls the appropriate controller
 */
export const webhookRequestHandler = async (req: RasaRequest, res: RasaResponse): Promise<void> => {
  try {
    switch (req.body.next_action) {
      case INTENTS.ACTION_MEASURAND_COMPLETE:
        await completeRequestHandler(req, res);
        break;
      case INTENTS.ACTION_MEASURAND_MAX:
        await maxRequestHandler(req, res);
        break;
      case INTENTS.ACTION_MEASURAND_MIN:
        await minRequestHandler(req, res);
        break;
      case INTENTS.ACTION_MEASURAND_THRESHOLD:
        await thresholdRequestHandler(req, res);
        break;
      case INTENTS.ACTION_REFINE_STATION:
        await refineStationRequestHandler(req, res);
        break;
      case INTENTS.ACTION_REFINE_MEASURAND:
        await refineMeasurandRequestHandler(req, res);
        break;
      case INTENTS.ACTION_DEFAULT_QANARY:
        await fallbackRequestHandler(req, res);
        break;
      case INTENTS.ASK_AFFIRMATION:
        await askAffirmationRequestHandler(req, res);
        break;
      default:
        res.status(400);
        res.end();
    }
  } catch (e) {
    res.status(400);
    res.end();
  }
};
