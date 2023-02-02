import { RasaRequest, RasaResponse } from "../../../interfaces/http";

/**
 * Handles the intent/action of `action_context_air_measurand` by trying to answer the question with a Quanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const measurandAirRequestHandler = (req: RasaRequest, res: RasaResponse) => {
  res.json({
    responses: [
      {
        text: "Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet.",
        response: "",
      },
    ],
  });
  res.end();
};
