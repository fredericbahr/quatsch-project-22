import { IRepresentationData, RasaResponseType, REPRESENTATION_TYPE, SuccessRasaResponse } from "shared";

/**
 * Service for creating responses for the given representation to send to the user/rasa.
 */
export class ResponseService {
  /**
   * Gets the response for the given representation.
   * @param representation the wanted representation/anwser
   * @returns the response for the given representation
   */
  public static getResponseByRepresentation(representation: IRepresentationData): SuccessRasaResponse {
    switch (representation.type) {
      case REPRESENTATION_TYPE.Text:
        return this.createResponse(representation.value, RasaResponseType.Text);
      case REPRESENTATION_TYPE.Graph:
        return this.createResponse(representation.value, RasaResponseType.Image);
      case REPRESENTATION_TYPE.Table:
        return this.createResponse(representation.value, RasaResponseType.Image);
      default:
        return this.createResponse(representation.value, RasaResponseType.Text);
    }
  }

  /**
   * Creates a response object with the given value and property key.
   * @param value the value of the response
   * @param propKey the property key of the response (e.g. text, image)
   * @returns the response object with the given value and property key
   */
  private static createResponse = (value: string | URL, propKey: RasaResponseType): SuccessRasaResponse => {
    return {
      responses: [
        {
          [propKey]: value,
          response: "",
        },
      ],
    };
  };
}
