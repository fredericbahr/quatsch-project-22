import { Router } from "express";

import { measurandCompleteRequestHandler } from "./complete.controller";

export const measurandCompleteRouter: Router = Router();

measurandCompleteRouter.post("/", measurandCompleteRequestHandler);
