import { QanaryPipelineApi } from "api";

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
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const response = await startQuestionAnsweringWithTextQuestion();
  res.json({
    responses: [
      {
        text: `Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet: ${JSON.stringify(response.data)}`,
        response: "",
      },
    ],
  });
  res.end();
};
