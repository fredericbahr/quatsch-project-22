import { Router } from "express";

import { thresholdRequestHandler } from "./threshold.controller";

export const thresholdRouter: Router = Router();

thresholdRouter.post("/", thresholdRequestHandler);
