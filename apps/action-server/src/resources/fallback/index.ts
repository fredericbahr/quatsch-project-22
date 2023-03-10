import { Router } from "express";

import { defaultFallbackRouter } from "./default/fallback.router";

/**
 * Router for the refine resource
 */
export const fallbackRouter: Router = Router();

fallbackRouter.use("/", defaultFallbackRouter);
