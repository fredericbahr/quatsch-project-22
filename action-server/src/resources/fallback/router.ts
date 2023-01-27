import { Router } from "express";
import { actionAskAffirmation } from "./ask-affirmation";
import { actionDefaultQuanary } from "./default-quanary";

export const fallbackRouter = Router();

fallbackRouter.post("/", actionDefaultQuanary);
fallbackRouter.post("/affirmation", actionAskAffirmation);
