import { Router } from "express";
import { readTopic } from "./controller";

export const topicRouter = Router();

topicRouter.post("/", readTopic);
