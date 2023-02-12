import { IQanaryMessage } from "qanary-component-core";
import { IQanaryComponentMessageHandler } from "qanary-component-core";

/**
 * An event handler for incoming messages of the Qanary pipeline
 * Exported only for testing purposes
 * @param message incoming qanary pipeline message
 */
export const handler: IQanaryComponentMessageHandler = async (message: IQanaryMessage) => {
  console.log(message);
  return message;
};
