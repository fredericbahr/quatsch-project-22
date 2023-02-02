import { qanaryComponentApi } from "api";

/**
 * Gets the endpoint attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the endpoint attribute
 */
export const getEndpoint = (
  message: qanaryComponentApi.IQanaryMessage
): string | undefined => {
  return message.endpoint;
};

/**
 * Gets the inGraph attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the inGraph attribute
 */
export const getInGraph = (
  message: qanaryComponentApi.IQanaryMessage
): string | undefined => {
  return message.inGraph;
};

/**
 * Gets the outGraph attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the outGraph attribute
 */
export const getOutGraph = (
  message: qanaryComponentApi.IQanaryMessage
): string | undefined => {
  return message.outGraph;
};
