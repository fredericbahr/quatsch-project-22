import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";

import { webhookRouter } from "./resources/webhook/webhook.router";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const server: Express = express();
const port = process.env.ACTION_SERVER_PORT || 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use("/webhook", webhookRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Rasa Action Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
