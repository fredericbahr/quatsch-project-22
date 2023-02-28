import { Router } from "express";

import { maxRequestHandler } from "./max.controller";

export const maxRouter: Router = Router();

maxRouter.post("/", maxRequestHandler);
