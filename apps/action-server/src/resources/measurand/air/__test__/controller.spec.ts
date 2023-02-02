import { RasaRequest, RasaResponse } from "../../../../interfaces/http";
import { measurandAirRequestHandler } from "../measurand-air.controller";

describe("#Measurand controllers", () => {
  const req: RasaRequest = { body: { tracker: { latest_message: { text: "test" } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  afterEach(() => jest.clearAllMocks());

  it("should return a text response", () => {
    measurandAirRequestHandler(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            text: "Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet.",
          }),
        ]),
      }),
    );
  });
});
