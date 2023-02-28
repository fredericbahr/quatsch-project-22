import { Router } from "express";

import { refineMeasurandRequestHandler } from "./refine-measurand.controller";

export const refineMeasurandRouter: Router = Router();

refineMeasurandRouter.post("/", refineMeasurandRequestHandler);
