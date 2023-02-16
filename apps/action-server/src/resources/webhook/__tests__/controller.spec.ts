import { INTENTS, RasaRequest, RasaResponse } from "shared";

import { webhookRequestHandler } from "../webhook.controller";

jest.mock("api", () => ({
  ...jest.requireActual("api"),
  QanaryPipelineApi: {
    Configuration: jest.fn(),
    QanaryQuestionAnsweringControllerApiFactory: jest.fn(() => {
      return {
        createStartQuestionAnsweringWithTextQuestion: jest.fn(() => {
          return { data: "data" };
        }),
      };
    }),
  },
}));

describe("#Webhook controllers", () => {
  test("Valid intents", async () => {
    for (const intent in INTENTS) {
      const next_action: string = INTENTS[intent as keyof typeof INTENTS];
      const req = { body: { next_action } };
      const res = { json: jest.fn(), end: jest.fn() };

      await webhookRequestHandler(req as unknown as RasaRequest, res as unknown as RasaResponse);
      expect(res.json.mock.calls[0][0]).toHaveProperty("responses");
    }
  });

  test("Invalid intent", async () => {
    const req = { body: { next_action: "foo" } };
    const res = { status: jest.fn(), end: jest.fn() };

    await webhookRequestHandler(req as unknown as RasaRequest, res as unknown as RasaResponse);
    expect(res.status.mock.calls[0][0]).toBe(400);
  });

  test("Missing intent", () => {
    const req = { body: {} };
    const res = { status: jest.fn(), end: jest.fn() };

    webhookRequestHandler(req as RasaRequest, res as unknown as RasaResponse);
    expect(res.status.mock.calls[0][0]).toBe(400);
  });

  test("Missing request body", () => {
    const req = {};
    const res = { status: jest.fn(), end: jest.fn() };

    webhookRequestHandler(req as RasaRequest, res as unknown as RasaResponse);
    expect(res.status.mock.calls[0][0]).toBe(400);
  });
});
