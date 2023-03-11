import { RasaResponse } from "shared";

import { handleMeasurandCompleteRequestError } from "../../utils/handle-error";

describe("Handler error utils", () => {
  it("should return a response", () => {
    const res: RasaResponse = {
      json: jest.fn(),
    } as unknown as RasaResponse;

    handleMeasurandCompleteRequestError(res);

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
