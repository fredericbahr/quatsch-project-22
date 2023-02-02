import { Router } from "express";
import { webhookRequestHandler } from "./webhook.controller";

export const webhookRouter: Router = Router();

webhookRouter.post("/", webhookRequestHandler);
