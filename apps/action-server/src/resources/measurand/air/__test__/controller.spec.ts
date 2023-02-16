import { RasaRequest, RasaResponse } from "../../../../interfaces/http";
import { measurandAirRequestHandler } from "../measurand-air.controller";

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

describe("#Measurand controllers", () => {
  const req: RasaRequest = { body: { tracker: { latest_message: { text: "test" } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  it("should return a text response", async () => {
    await measurandAirRequestHandler(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            text: 'Anfrage wurde durch Qanary-Measunrand-Air-Pipeline beantwortet: "data"',
          }),
        ]),
      }),
    );
  });
});
