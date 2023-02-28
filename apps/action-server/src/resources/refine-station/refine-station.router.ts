import { Router } from "express";

import { refineStationRequestHandler } from "./refine-station.controller";

export const refineStationRouter: Router = Router();

refineStationRouter.post("/", refineStationRequestHandler);
