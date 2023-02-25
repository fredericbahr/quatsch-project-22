import { ILUBWData, RasaResponse } from "shared";

import { VerificationError } from "../errors/VerificationError";

/**
 * Service for handling verification errors that should be thrown if the LUBW data is not valid/complete.
 */
export class ErrorHandlingService {
  public static handleVerificationError(res: RasaResponse, error: VerificationError): RasaResponse {
    const invalidProperty: keyof ILUBWData = error.invalidProperty;

    switch (invalidProperty) {
      case "station":
        return this.handleStationError(res, error);
      case "measurand":
        return this.handleMeasurandError(res, error);
      default:
        return this.handleDefaultError(res);
    }
  }

  /**
   * Handles an error gracefully by returning a response to the user.
   * @param res the response object
   */
  public static handleDefaultError(res: RasaResponse): RasaResponse {
    return res.json({
      responses: [
        {
          text: "Beim Bearbeiten der Anfrage ist etwas schief gelaufen. Ich kann diese nicht beantworten.",
          response: "",
        },
      ],
    });
  }

  /**
   * Handles the VerificationError for an invalid station property.
   * @param res the response object
   * @param error the verification error
   * @returns a response to rasa
   */
  private static handleStationError(res: RasaResponse, error: VerificationError): RasaResponse {
    const unvalidLUBWData: Partial<ILUBWData> = error.unvalidLUBWData;

    return res.json({
      responses: [
        {
          text: "Ich konnte keine Messstation finden. Diese wird aber zwinged benötigt. Bitte gib eine gültige Messstation an",
          response: "",
        },
      ],
    });
  }

  /**
   * Handles the VerificationError for an invalid measurand property.
   * @param res the response object
   * @param error the verification error
   * @returns a response to rasa
   */
  private static handleMeasurandError(res: RasaResponse, error: VerificationError): RasaResponse {
    const unvalidLUBWData: Partial<ILUBWData> = error.unvalidLUBWData;

    return res.json({
      responses: [
        {
          text: "Ich konnte keine Messgröße finden. Diese wird aber zwinged benötigt. Bitte gib eine gültige Messgröße an",
          response: "",
        },
      ],
    });
  }
}
