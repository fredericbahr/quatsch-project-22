import { Request, RequestHandler, Response } from "express";

import { IQanaryComponentCoreDescription } from "../interfaces/description";

/**
 * Request handler for the "/about" endpoint
 * @param description the description of the component
 */
export const aboutHandler = (description?: IQanaryComponentCoreDescription): RequestHandler => {
  return (req: Request, res: Response) => {
    res.status(200).json(description || {});
  };
};
