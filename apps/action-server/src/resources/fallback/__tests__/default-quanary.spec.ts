import { RasaRequest, RasaResponse } from "shared";

import { fallbackRequestHandler } from "../fallback.controller";

describe("#Action Default Qanary", () => {
  const req: RasaRequest = { body: { tracker: { latest_message: { text: "test" } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  afterEach(() => jest.clearAllMocks());

  it("should return a text response", () => {
    fallbackRequestHandler(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            text: "Anfrage wurde durch Qanary-Default-Pipeline beantwortet.",
          }),
        ]),
      }),
    );
  });
});
