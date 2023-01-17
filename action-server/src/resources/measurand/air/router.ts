import { Router } from "express";
import { readMeasurandAir } from "./controller";

export const measurandAirRouter = Router();

measurandAirRouter.post("/", readMeasurandAir);
