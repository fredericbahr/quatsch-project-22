import { defaultLUBWData } from "shared";

import { VerificationError } from "../../errors/verification-error";
import { VerificationService } from "../verification-service";

describe("Verification Service", () => {
  describe("verifyLUBWData", () => {
    it("should throw an error if the station is an empty string", () => {
      const lubwData = {
        station: "",
        measurand: "measurand",
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should throw an error if the station is undefined", () => {
      const lubwData = {
        station: undefined,
        measurand: "measurand",
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should throw an error if the station is missing", () => {
      const lubwData = {
        measurand: "measurand",
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should throw an error if the measurand is an empty string", () => {
      const lubwData = {
        station: "station",
        measurand: "",
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should throw an error if the measurand is undefined", () => {
      const lubwData = {
        station: "station",
        measurand: undefined,
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should throw an error if the measurand is missing", () => {
      const lubwData = {
        station: "station",
        ...defaultLUBWData,
      };

      expect(() => VerificationService.verifyLUBWData(lubwData)).toThrow(VerificationError);
    });

    it("should return the lubw data if it is valid", () => {
      const lubwData = {
        station: "station",
        measurand: "measurand",
        ...defaultLUBWData,
      };

      expect(VerificationService.verifyLUBWData(lubwData)).toEqual(lubwData);
    });
  });
});
