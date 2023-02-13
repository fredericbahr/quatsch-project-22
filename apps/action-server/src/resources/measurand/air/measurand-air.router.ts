import { Router } from "express";

import { measurandAirRequestHandler } from "./measurand-air.controller";

export const measurandAirRouter: Router = Router();

measurandAirRouter.post("/", measurandAirRequestHandler);
