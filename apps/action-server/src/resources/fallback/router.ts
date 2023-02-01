import { Router } from "express";
import { actionAskAffirmation } from "./ask-affirmation";
import { actionDefaultQanary } from "./default-quanary";

export const fallbackRouter = Router();

fallbackRouter.post("/", actionDefaultQanary);
fallbackRouter.post("/affirmation", actionAskAffirmation);
