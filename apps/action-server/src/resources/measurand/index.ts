import { Router } from "express";

import { completeRouter } from "./complete/complete.router";
import { maxRouter } from "./max/max.router";
import { minRouter } from "./min/min.router";

/**
 * Router for the measurand resource
 */
export const measurandRouter: Router = Router();

measurandRouter.use("/complete", completeRouter);
measurandRouter.use("/max", maxRouter);
measurandRouter.use("/min", minRouter);
