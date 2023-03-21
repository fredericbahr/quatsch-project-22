import { ILUBWDataKey } from "shared";

import { VerificationError } from "../verification-error";

describe("Verification Error", () => {
  const message = "message";
  const unvalidLUBWData = {
    station: "station",
  };
  const invalidProperty = ILUBWDataKey.Measurand;

  it("should create a new instance", () => {
    const error = new VerificationError(message, unvalidLUBWData, invalidProperty);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toEqual("VerificationError");
  });

  it("should return the unvalid LUBW data", () => {
    const error = new VerificationError(message, unvalidLUBWData, invalidProperty);
    expect(error.unvalidLUBWData).toEqual(unvalidLUBWData);
  });

  it("should return the invalid property", () => {
    const error = new VerificationError(message, unvalidLUBWData, invalidProperty);
    expect(error.invalidProperty).toEqual(invalidProperty);
  });
});
