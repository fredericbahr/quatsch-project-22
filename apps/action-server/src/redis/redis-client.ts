import dotenv from "dotenv";
import path from "path";
import { createClient } from "redis";

dotenv.config({ path: path.join(__dirname, "../../../../.env") });

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: true,
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
});
