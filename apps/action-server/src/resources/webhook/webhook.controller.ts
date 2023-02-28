import { INTENTS, RasaRequest, RasaResponse } from "shared";

import { askAffirmationRequestHandler, fallbackRequestHandler } from "../fallback-default/fallback.controller";
import { measurandAirRequestHandler } from "../measurand/air/measurand-air.controller";
import { refineMeasurandRequestHandler } from "../refine-measurand/refine-measurand.controller";
import { refineStationRequestHandler } from "../refine-station/refine-station.controller";

export const webhookRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  try {
    switch (req.body.next_action) {
      case INTENTS.ACTION_CONTEXT_AIR_MEASURAND:
        await measurandAirRequestHandler(req, res);
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
