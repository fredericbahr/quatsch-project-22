import { RasaRequest, RasaResponse } from "../interfaces/http";
import { generateTopicAnnotation } from "../resources/topic/controller";
import { compare, qanaryBypass } from "./qanary";
import { generateMeasurandAirAnnotation } from "../resources/measurand/air/controller";
import { generateStationAnnotation } from "../resources/station/controller";

const actionContextAirMeasurand = async (req: RasaRequest, res: RasaResponse) => {
  // Search for topic with trivial search or qanary retrieval
  const topicAnnotation = generateTopicAnnotation(req);
  const qanaryAnnotation = qanaryBypass(req);
  const annotation = compare(topicAnnotation, qanaryAnnotation);
  // Search for air measurands with trivial search
  const measurandAirAnnotation = generateMeasurandAirAnnotation(req);
  // Search for stations with trivial search
  const stationAnnotation = generateStationAnnotation(req);

  res.json({
    responses: [
      ...stationAnnotation.body.responses,
      ...measurandAirAnnotation.body.responses,
      ...annotation.body.responses,
    ],
  });
};

const actionFallback = async (req: RasaRequest, res: RasaResponse) => {
  res.json({
    responses: [
      {
        text: `Leider ist etwas schief gelaufen ...`,
      },
    ],
  });
};

enum Next_Action {
  Action_Context_Air_Measurand = "action_context_air_measurand",
}

export const handleCustomAction = async (req: RasaRequest, res: RasaResponse) => {
  try {
    switch (req.body.next_action) {
      case Next_Action.Action_Context_Air_Measurand:
        await actionContextAirMeasurand(req, res);
        break;
      default:
        await actionFallback(req, res);
    }
  } catch (e) {
    res.status(400);
    res.end();
  }
};
