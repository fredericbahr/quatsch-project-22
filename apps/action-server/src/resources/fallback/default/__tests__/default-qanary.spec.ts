import { RasaRequest, RasaResponse } from "shared";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { abstractRequestHandler } from "../../../measurand/abstract/abstract.controller";
import { fallbackRequestHandler } from "../fallback.controller";

jest.mock("../../../measurand/abstract/abstract.controller", () => ({
  abstractRequestHandler: jest.fn(),
}));

describe("#Action Default Qanary", () => {
  const req: RasaRequest = { body: { tracker: { latest_message: { text: "test" } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  const mockAbstractRequestHandler: jest.Mock = jest.fn();

  beforeEach(() => {
    (abstractRequestHandler as jest.Mock) = mockAbstractRequestHandler;
  });

  afterEach(() => jest.clearAllMocks());

  it("should call abstract request handler", async () => {
    await fallbackRequestHandler(req, res);

    expect(mockAbstractRequestHandler).toBeCalled();
  });
});
