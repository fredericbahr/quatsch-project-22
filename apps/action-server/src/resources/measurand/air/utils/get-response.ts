import { IRepresentationData, RasaResponseType, REPRESENTATION_TYPE, ResponseForMeasurandAir } from "shared";

/**
 * Gets the response for the measurand air with the given representation.
 * @param representation the representation/anwser of the measurand air
 * @returns the response for the measurand air with the given representation
 */
export const getResponseForMeasurandAir = (representation: IRepresentationData): ResponseForMeasurandAir => {
  switch (representation.type) {
    case REPRESENTATION_TYPE.TEXT:
      return createResponse(representation.value, RasaResponseType.TEXT);
    case REPRESENTATION_TYPE.GRAPH:
      return createResponse(representation.value, RasaResponseType.IMAGE);
    case REPRESENTATION_TYPE.TABLE:
      return createResponse(representation.value, RasaResponseType.IMAGE);
    default:
      return createResponse(representation.value, RasaResponseType.TEXT);
  }
};

/**
 * Creates a response object with the given value and property key.
 * @param value the value of the response
 * @param propKey the property key of the response (e.g. text, image)
 * @returns the response object with the given value and property key
 */
const createResponse = (value: string | URL, propKey: RasaResponseType): ResponseForMeasurandAir => {
  return {
    responses: [
      {
        [propKey]: value,
        response: "",
      },
    ],
  };
};
