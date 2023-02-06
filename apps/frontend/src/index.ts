import express, { Express } from "express";

export const server: Express = express();
const port = 3000;

server.use(express.static("public"));

server.listen(port, () => {
  console.log(`⚡️[frontend]: Frontend is running at http://localhost:${port}`);
});
