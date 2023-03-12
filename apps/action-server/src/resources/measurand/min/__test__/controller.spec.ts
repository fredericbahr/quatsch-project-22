import { RasaRequest, RasaResponse } from "shared";

import { minRequestHandler } from "../min.controller";

describe("#Find min controllers", () => {
  const senderId = "test-sender-id";
  const text = "Ich bin der Test-Text";

  const req: RasaRequest = {
    body: { sender_id: senderId, tracker: { latest_message: { text } } },
  } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  it("should respond to requests", async () => {
    await minRequestHandler(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
