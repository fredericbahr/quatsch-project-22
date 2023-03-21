import { NoIntentHandlerError } from "../no-intent-handler-error";

describe("No Intent Handler Error", () => {
  it("should create a new instance", () => {
    const error = new NoIntentHandlerError("message");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toEqual("NoIntentHandlerError");
  });
});
