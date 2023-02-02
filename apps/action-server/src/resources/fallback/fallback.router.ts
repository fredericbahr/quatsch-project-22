import { Router } from "express";
import { askAffirmationRequestHandler, fallbackRequestHandler } from "./fallback.controller";

export const fallbackRouter = Router();

fallbackRouter.post("/", fallbackRequestHandler);
fallbackRouter.post("/affirmation", askAffirmationRequestHandler);
