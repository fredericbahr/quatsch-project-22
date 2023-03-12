import { Router } from "express";

import { refineMeasurandRouter } from "./measurand/refine-measurand.router";
import { refineStationRouter } from "./station/refine-station.router";

/**
 * Router for the refine resource
 */
export const refineRouter: Router = Router();

refineRouter.use("/measurand", refineMeasurandRouter);
refineRouter.use("/station", refineStationRouter);
