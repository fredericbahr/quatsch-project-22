import { Router } from "express";

import { measurandCompleteRouter } from "./complete/complete.router";

/**
 * Router for the measurand resource
 */
export const measurandRouter: Router = Router();

measurandRouter.use("/", measurandCompleteRouter);
