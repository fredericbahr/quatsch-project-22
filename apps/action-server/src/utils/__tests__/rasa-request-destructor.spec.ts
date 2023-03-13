import { RasaRequest } from "shared";

import { rasaRequestDestructor } from "../rasa-request-destructor";

describe("#Rasa Request Destructor", () => {
  it("should return the relevant data destructed from Rasa requests", () => {
    const req = {
      body: {
        tracker: {
          latest_message: {
            text: "question",
          },
        },
        next_action: "intent",
        sender_id: "senderId",
      },
    } as RasaRequest;
    const result = rasaRequestDestructor(req);

    expect(result).toEqual({
      question: "question",
      intent: "intent",
      senderId: "senderId",
    });
  });
});
