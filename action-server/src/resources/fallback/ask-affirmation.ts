import { RasaRequest, RasaResponse } from "../../interfaces/http";

/**
 * Handles the intent/action of `action_default_ask_affirmation` by asking the user if the bot should continue
 * by using a default quanary pipeline or if the user wants to rephrase
 * @param req Request Object
 * @param res Response Object
 */
export const actionAskAffirmation = async (req: RasaRequest, res: RasaResponse) => {
  res.json({
    events: [],
    responses: [
      {
        text: "Das habe ich nicht richtig verstanden. Soll ich trotzdem versuchen die Anfrage zu bearbeiten",
        buttons: [
          { title: "Ja, Anfrage bearbeiten", payload: "/quanary_default_processing" },
          { title: "Nein, erneut fragen", payload: "/out_of_scope" },
        ],
      },
    ],
  });
  res.end();
};
