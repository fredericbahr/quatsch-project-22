import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import baseRouter from "./src/routes/baseRouter";
import { topicRouter } from "./src/resources/topic/router";
import { stationRouter } from "./src/resources/station/router";
import { measurandAirRouter } from "./src/resources/measurand/air/router";

dotenv.config();

const server: Express = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use(baseRouter);
server.use("/api/measurand/air", measurandAirRouter);
server.use("/api/station", stationRouter);
server.use("/api/topic", topicRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
