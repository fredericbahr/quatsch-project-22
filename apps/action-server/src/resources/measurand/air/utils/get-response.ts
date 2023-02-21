import { ActionServerApi } from "api";

import { IRepresentationData, REPRESENTATION_TYPE } from "../../../../services/representation-service";

/** type of response we return from measurand air */
export type ResponseForMeasurandAir = ActionServerApi.CallAction200Response;

enum ResponseType {
  TEXT = "text",
  IMAGE = "image",
}

/**
 * Gets the response for the measurand air with the given representation.
 * @param representation the representation/anwser of the measurand air
 * @returns the response for the measurand air with the given representation
 */
export const getResponseForMeasurandAir = (representation: IRepresentationData): ResponseForMeasurandAir => {
  switch (representation.type) {
    case REPRESENTATION_TYPE.TEXT:
      return createResponse(representation.value, ResponseType.TEXT);
    case REPRESENTATION_TYPE.GRAPH:
      return createResponse(representation.value, ResponseType.IMAGE);
    case REPRESENTATION_TYPE.TABLE:
      return createResponse(representation.value, ResponseType.IMAGE);
    default:
      return createResponse(representation.value, ResponseType.TEXT);
  }
};

/**
 * Creates a response object with the given value and property key.
 * @param value the value of the response
 * @param propKey the property key of the response (e.g. text, image)
 * @returns the response object with the given value and property key
 */
const createResponse = (value: string | URL, propKey: ResponseType): ResponseForMeasurandAir => {
  return {
    responses: [
      {
        [propKey]: value,
        response: "",
      },
    ],
  };
};
