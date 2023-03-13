import { Router } from "express";

import { completeRouter } from "./complete/complete.router";
import { maxRouter } from "./max/max.router";
import { minRouter } from "./min/min.router";
import { seasonRouter } from "./season/season.router";
import { thresholdRouter } from "./threshold/threshold.router";

/**
 * Router for the measurand resource
 */
export const measurandRouter: Router = Router();

measurandRouter.use("/complete", completeRouter);
measurandRouter.use("/max", maxRouter);
measurandRouter.use("/min", minRouter);
measurandRouter.use("/threshold", thresholdRouter);
measurandRouter.use("/season", seasonRouter);
