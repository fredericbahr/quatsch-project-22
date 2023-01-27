import { RasaRequest, RasaResponse } from "../../interfaces/http";

/**
 * Handles the intent/action of `action_default_quanary` by trying to answer the question with a Quanary (default) pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const actionDefaultQuanary = async (req: RasaRequest, res: RasaResponse) => {
  const question: string = req.body.tracker.latest_message.text;

  res.json({
    events: [],
    responses: [
      {
        text: "Anfrage wurde durch Quanary-Default-Pipeline beantwortet.",
      },
    ],
  });
  res.end();
};
