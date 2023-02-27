import { Router } from "express";

import { fallbackStationRequestHandler } from "./fallback-station.controller";

export const fallbackStationRouter: Router = Router();

fallbackStationRouter.post("/", fallbackStationRequestHandler);
