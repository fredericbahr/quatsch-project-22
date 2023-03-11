import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";

import { redisClient } from "./redis/redis-client";
import { fallbackRouter } from "./resources/fallback";
import { measurandRouter } from "./resources/measurand";
import { refineRouter } from "./resources/refine";
import { webhookRouter } from "./resources/webhook/webhook.router";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const server: Express = express();
const port = process.env.ACTION_SERVER_PORT || 8080;

redisClient.connect();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use("/webhook", webhookRouter);

/** for testing purposes only */
server.use("/fallback", fallbackRouter);
server.use("/measurand", measurandRouter);
server.use("/refine", refineRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Rasa Action Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
