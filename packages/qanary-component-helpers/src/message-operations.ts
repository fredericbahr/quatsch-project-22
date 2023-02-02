import { IQanaryMessage } from "../../qanary-component-core/src/interfaces/message";

/**
 * Gets the endpoint attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the endpoint attribute
 */
export const getEndpoint = (message: IQanaryMessage): string => {
  return message.endpoint;
};

/**
 * Gets the inGraph attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the inGraph attribute
 */
export const getInGraph = (message: IQanaryMessage): string => {
  return message.inGraph;
};

/**
 * Gets the outGraph attribute from the message
 * @param message the message received from the qanary pipeline
 * @returns the outGraph attribute
 */
export const getOutGraph = (message: IQanaryMessage): string => {
  return message.outGraph;
};
