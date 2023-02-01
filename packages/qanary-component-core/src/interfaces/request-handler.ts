import { Request, Response } from "express";
import { IQanaryMessage } from "./message";

/** the request type of the qanary component core request for the service handler */
type IQanaryComponentCoreRequest = Request<never, never, IQanaryMessage>;

/** the request type of the qanary component core response for the service handler */
type IQanaryComponentCoreResponse = Response<IQanaryMessage>;

/** the request handler type of the qanary component core */
export type IQanaryComponentCoreRequestHandler = (
  req: IQanaryComponentCoreRequest,
  res: IQanaryComponentCoreResponse
) => void;
