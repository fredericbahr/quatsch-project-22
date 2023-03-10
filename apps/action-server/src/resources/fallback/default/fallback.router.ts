import { Router } from "express";

import { askAffirmationRequestHandler, fallbackRequestHandler } from "./fallback.controller";

export const defaultFallbackRouter: Router = Router();

defaultFallbackRouter.post("/", fallbackRequestHandler);
defaultFallbackRouter.post("/affirmation", askAffirmationRequestHandler);
