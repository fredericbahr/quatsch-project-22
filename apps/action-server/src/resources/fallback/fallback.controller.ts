import { RasaRequest, RasaResponse } from "../../interfaces/http";

/**
 * Handles the intent/action of `action_default_qanary` by trying to answer the question with a Qanary (default) pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const fallbackRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  // const question: string = req.body.tracker.latest_message.text;

  res.json({
    responses: [
      {
        text: "Anfrage wurde durch Qanary-Default-Pipeline beantwortet.",
        response: "",
      },
    ],
  });
  res.end();
};

/**
 * Handles the intent/action of `action_default_ask_affirmation` by asking the user if the bot should continue
 * by using a default qanary pipeline or if the user wants to rephrase
 * @param req Request Object
 * @param res Response Object
 */
export const askAffirmationRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  res.json({
    responses: [
      {
        text: "Das habe ich nicht richtig verstanden. Soll ich trotzdem versuchen die Anfrage zu bearbeiten",
        buttons: [
          { title: "Ja, Anfrage bearbeiten", payload: "/qanary_default_processing" },
          { title: "Nein, erneut fragen", payload: "/out_of_scope" },
        ],
        response: "",
      },
    ],
  });
  res.end();
};
