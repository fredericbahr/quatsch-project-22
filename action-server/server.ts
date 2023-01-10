import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import baseRouter from "./src/routes/baseRouter";

dotenv.config();

const server: Express = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use(baseRouter);

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
