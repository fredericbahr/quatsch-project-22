import { LupoCloudApi, QanaryPipelineApi } from "api";

import { RasaRequest, RasaResponse } from "../../../interfaces/http";

/**
 * A qanary pipeline example fetch
 */
const startQuestionAnsweringWithTextQuestion = () => {
  return QanaryPipelineApi.QanaryQuestionAnsweringControllerApiFactory(
    new QanaryPipelineApi.Configuration({ basePath: "http://qanary-pipeline:40111" }),
  ).createStartQuestionAnsweringWithTextQuestion({
    question: "Wie ist der Ozonwert in Ulm am 23.01.2023?",
    componentlist: ["qanary-component-time"],
  });
};

/**
 * A lupo cloud example fetch
 */
const readMetric = () => {
  return LupoCloudApi.LUPOAirMetricControllerApiFactory().readMetric(
    LupoCloudApi.ILupoAirMetric.O3,
    "7d-ago",
    "station:DEBW039",
  );
};

/**
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const qanaryResponse = await startQuestionAnsweringWithTextQuestion();
  const lupResponse = await readMetric();
  console.log(qanaryResponse.data, lupResponse.data);

  res.json({
    responses: [
      {
        text: `Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet`,
        response: "",
      },
    ],
  });
  res.end();
};
