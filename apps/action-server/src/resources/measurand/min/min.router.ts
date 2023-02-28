import { Router } from "express";

import { minRequestHandler } from "./min.controller";

export const minRouter: Router = Router();

minRouter.post("/", minRequestHandler);
