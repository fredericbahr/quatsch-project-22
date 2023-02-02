import { Request, Response } from "express";

/**
 * Request handler for the "/health" endpoint
 * @param req Request object
 * @param res Response object
 */
export const healthHandler = (req: Request, res: Response) => {
  return res.status(200).json({
    status: "UP",
  });
};
