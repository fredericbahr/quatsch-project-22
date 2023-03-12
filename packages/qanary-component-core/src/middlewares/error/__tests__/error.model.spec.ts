import { Request } from "express";

import { ErrorResponse } from "../error.model";

describe("#Component ErrorResponse", () => {
  const ERROR_CODE = 500;

  it("should create new ErrorResponse instance from provided error and response", async () => {
    const error = new Error("test error");
    const request = {
      path: "test path",
    } as Request;

    const errorResponse = ErrorResponse.from(error, request);

    expect(errorResponse.timestamp).not.toBeNull();
    expect(errorResponse.status).toStrictEqual(ERROR_CODE);
    expect(errorResponse.error).toStrictEqual(error.message);
    expect(errorResponse.path).toStrictEqual(request.path);
  });

  it("should create new ErrorResponse instance with defaults", async () => {
    const error = new Error();
    const request = {} as Request;
    const errorResponse = ErrorResponse.from(error, request);

    expect(errorResponse.timestamp).not.toBeNull();
    expect(errorResponse.status).toStrictEqual(ERROR_CODE);
    expect(errorResponse.error).toStrictEqual("");
    expect(errorResponse.path).toStrictEqual("");
  });
});
