import { RasaRequest } from "shared";

/**
 * The relevant data from a destructed from a rasa request
 */
export interface IRasaRequestDestruction {
  question: string;
  intent: string | undefined;
  senderId: string | undefined;
}

/**
 * Returns the relevant data destructed from Rasa requests
 * @param req a Rasa request
 */
export const rasaRequestDestructor = (req: RasaRequest): IRasaRequestDestruction => {
  return {
    question: req.body.tracker?.latest_message?.text ?? "",
    intent: req.body.next_action,
    senderId: req.body.sender_id,
  };
};
