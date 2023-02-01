import { RasaRequest, RasaResponse } from "../../../interfaces/http";
import { actionAskAffirmation } from "../ask-affirmation";

describe("#Action Ask Affirmation", () => {
  const req: RasaRequest = {} as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  afterEach(() => jest.clearAllMocks());

  it("should return a text response", () => {
    actionAskAffirmation(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            text: "Das habe ich nicht richtig verstanden. Soll ich trotzdem versuchen die Anfrage zu bearbeiten",
          }),
        ]),
      }),
    );
  });

  it("should return a button response", () => {
    actionAskAffirmation(req, res);

    expect(res.end).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        responses: expect.arrayContaining([
          expect.objectContaining({
            buttons: expect.arrayContaining([
              expect.objectContaining({
                title: "Ja, Anfrage bearbeiten",
                payload: "/quanary_default_processing",
              }),
              expect.objectContaining({
                title: "Nein, erneut fragen",
                payload: "/out_of_scope",
              }),
            ]),
          }),
        ]),
      }),
    );
  });
});
