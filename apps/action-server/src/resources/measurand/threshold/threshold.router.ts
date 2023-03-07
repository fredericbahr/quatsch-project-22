import { Router } from "express";

import { measurandThresholdRequestHandler } from "./threshold.controller";

export const measurandThresholdRouter: Router = Router();

measurandThresholdRouter.post("/", measurandThresholdRequestHandler);
