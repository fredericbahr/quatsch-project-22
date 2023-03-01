import { IRepresentationData, RasaResponseType, REPRESENTATION_TYPE, SuccessRasaResponse } from "shared";

/**
 * Gets the response for the measurand air with the given representation.
 * @param representation the representation/anwser of the measurand air
 * @returns the response for the measurand air with the given representation
 */
export const getResponseForMeasurandAir = (representation: IRepresentationData): SuccessRasaResponse => {
  switch (representation.type) {
    case REPRESENTATION_TYPE.Text:
      return createResponse(representation.value, RasaResponseType.Text);
    case REPRESENTATION_TYPE.Graph:
      return createResponse(representation.value, RasaResponseType.Image);
    case REPRESENTATION_TYPE.Table:
      return createResponse(representation.value, RasaResponseType.Image);
    default:
      return createResponse(representation.value, RasaResponseType.Text);
  }
};

/**
 * Creates a response object with the given value and property key.
 * @param value the value of the response
 * @param propKey the property key of the response (e.g. text, image)
 * @returns the response object with the given value and property key
 */
const createResponse = (value: string | URL, propKey: RasaResponseType): SuccessRasaResponse => {
  return {
    responses: [
      {
        [propKey]: value,
        response: "",
      },
    ],
  };
};
