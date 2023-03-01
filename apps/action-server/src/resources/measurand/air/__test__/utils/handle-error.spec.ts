import { RasaResponse } from "shared";

import { handleMeasurandAirRequestError } from "../../utils/handle-error";

describe("Handler error utils", () => {
  it("should return a response", () => {
    const res: RasaResponse = {
      json: jest.fn(),
    } as unknown as RasaResponse;

    handleMeasurandAirRequestError(res);

    expect(res.json).toHaveBeenCalledWith({
      responses: [
        {
          text: "Beim Bearbeiten der Anfrage ist etwas schief gelaufen. Ich kann diese nicht beantworten.",
          response: "",
        },
      ],
    });
  });
});
