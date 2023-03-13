import { Router } from "express";

import { seasonRequestHandler } from "./season.controller";

export const seasonRouter: Router = Router();

seasonRouter.post("/", seasonRequestHandler);
