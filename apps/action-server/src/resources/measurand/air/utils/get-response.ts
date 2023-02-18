import { IRepresentationData, REPRESENTATION_TYPE } from "../../../../services/representation-service";

/**
 * Gets the response for the measurand air with the given representation.
 * @param representation the representation/anwser of the measurand air
 * @returns the response for the measurand air with the given representation
 */
export const getResponseForMeasurandAir = (representation: IRepresentationData): any => {
  switch (representation.type) {
    case REPRESENTATION_TYPE.TEXT:
      return createResponse(representation.value, "text");
    case REPRESENTATION_TYPE.CHART:
      return createResponse(representation.value, "image");
    case REPRESENTATION_TYPE.TABLE:
      return createResponse(representation.value, "image");
    default:
      return createResponse(representation.value, "text");
  }
};

/**
 * Creates a response object with the given value and property key.
 * @param value the value of the response
 * @param propKey the property key of the response (e.g. text, image)
 * @returns the response object with the given value and property key
 */
const createResponse = (value: string | URL, propKey: string): unknown => {
  return {
    responses: [
      {
        [propKey]: value,
        response: "",
      },
    ],
  };
};
