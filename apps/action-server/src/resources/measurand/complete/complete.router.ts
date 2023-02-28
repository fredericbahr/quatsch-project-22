import { Router } from "express";

import { completeRequestHandler } from "./complete.controller";

export const completeRouter: Router = Router();

completeRouter.post("/", completeRequestHandler);
