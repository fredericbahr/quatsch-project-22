import { ILUBWDataKey, RasaResponse } from "shared";

import { VerificationError } from "../../errors/VerificationError";
import { ErrorHandlingService } from "../error-handling-service";

describe("Error Handling Service", () => {
  const res: RasaResponse = { json: jest.fn(), end: jest.fn() } as unknown as RasaResponse;
  const message = "message";
  const unvalidLUBWData = {};

  describe("handleVerificationError", () => {
    let verificationError: VerificationError;

    describe("missing station property", () => {
      beforeEach(() => {
        verificationError = new VerificationError(message, unvalidLUBWData, ILUBWDataKey.Station);
      });

      it("should return a response with the correct text", () => {
        ErrorHandlingService.handleVerificationError(res, verificationError);

        expect(res.json).toHaveBeenCalledWith({
          responses: [
            {
              response: "",
              text: expect.stringContaining("Messstation"),
              buttons: expect.any(Array),
            },
          ],
        });
      });
    });

    describe("missing measurand property", () => {
      beforeEach(() => {
        verificationError = new VerificationError(message, unvalidLUBWData, ILUBWDataKey.Measurand);
      });
      it("should return a response with the correct text", () => {
        ErrorHandlingService.handleVerificationError(res, verificationError);

        expect(res.json).toHaveBeenCalledWith({
          responses: [
            {
              response: "",
              text: expect.stringContaining("Messgröße"),
              buttons: expect.any(Array),
            },
          ],
        });
      });
    });

    describe("default case", () => {
      beforeEach(() => {
        verificationError = new VerificationError(message, unvalidLUBWData, ILUBWDataKey.Calculation);
      });

      it("should return a response with the correct text", () => {
        ErrorHandlingService.handleVerificationError(res, verificationError);

        expect(res.json).toHaveBeenCalledWith({
          responses: [
            {
              text: expect.stringContaining("Anfrage ist etwas schief gelaufen"),
              response: "",
            },
          ],
        });
      });
    });
  });

  describe("handleNoIntentHandlerError", () => {
    it("should return a response with the correct text", () => {
      ErrorHandlingService.handleNoIntentHandlerError(res);

      expect(res.json).toHaveBeenCalledWith({
        responses: [
          {
            response: "",
            text: expect.stringContaining("Ich konnte den letzten Intent nicht finden"),
            buttons: expect.any(Array),
          },
        ],
      });
    });
  });

  describe("handleDefaultError", () => {
    it("should return a response with the correct text", () => {
      ErrorHandlingService.handleDefaultError(res);

      expect(res.json).toHaveBeenCalledWith({
        responses: [
          {
            text: expect.stringContaining("Beim Bearbeiten der Anfrage ist etwas schief gelaufen"),
            response: "",
          },
        ],
      });
    });
  });
});
