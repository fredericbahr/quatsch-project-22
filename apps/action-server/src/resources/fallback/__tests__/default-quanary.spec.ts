import { RasaRequest, RasaResponse } from "../../../interfaces/http";
import { actionDefaultQanary } from "../default-quanary";

describe("#Action Default Quanary", () => {
  const req: RasaRequest = { body: { tracker: { latest_message: { text: "test" } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  afterEach(() => jest.clearAllMocks());

  it("should return a text response", () => {
    actionDefaultQanary(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            text: "Anfrage wurde durch Quanary-Default-Pipeline beantwortet.",
          }),
        ]),
      }),
    );
  });
});
