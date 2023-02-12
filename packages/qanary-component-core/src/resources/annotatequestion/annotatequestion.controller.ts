import { QanaryComponentApi } from "api";
import { RequestHandler } from "express";

import { IQanaryComponentMessageHandler } from "./annotatequestion.model";

/**
 * Validates if all necessary properties are members of the message object
 * @param message incoming qanary pipeline message
 */
const isValidateMessage = (message: QanaryComponentApi.IQanaryMessage) => {
  return !(message.endpoint && message.inGraph && message.outGraph);
};

/**
 * Request handler for the `/annotatequestion` endpoint
 * @param handler the event handler for incoming messages of the Qanary pipeline, passed the using component
 */
export const createAnnotateQuestion = async (handler: IQanaryComponentMessageHandler): Promise<RequestHandler> => {
  return async (req, res, next) => {
    try {
      if (isValidateMessage(req.body)) {
        throw new Error("Message is invalid");
      }
      await handler(req.body);
      res.json(req.body);
    } catch (err) {
      next(err);
    }
  };
};
