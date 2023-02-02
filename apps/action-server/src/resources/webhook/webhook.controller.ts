import { RasaRequest, RasaResponse } from "../../interfaces/http";
import { askAffirmationRequestHandler, fallbackRequestHandler } from "../fallback/fallback.controller";
import { INTENTS } from "../../enums/intents";
import { measurandAirRequestHandler } from "../measurand/air/measurand-air.controller";

export const webhookRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  try {
    switch (req.body.next_action) {
      case INTENTS.ACTION_CONTEXT_AIR_MEASURAND:
        await measurandAirRequestHandler(req, res);
        break;
      case INTENTS.ACTION_DEFAULT_QUANARY:
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
