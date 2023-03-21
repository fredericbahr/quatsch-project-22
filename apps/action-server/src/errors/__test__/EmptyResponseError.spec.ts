import { EmptyResponseError } from "../empty-response-error";

describe("Empty Response Data Error", () => {
  it("should create a new instance", () => {
    const error = new EmptyResponseError("message");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toEqual("EmptyResponseError");
  });
});
