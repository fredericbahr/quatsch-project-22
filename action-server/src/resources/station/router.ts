import { Router } from "express";
import { readStation } from "./controller";

export const stationRouter = Router();

stationRouter.post("/", readStation);
