import { Router } from "express";

import { readHealth } from "./health.controller";

/**
 * The heatlh router for a qanary component
 */
export const healthRouter = async () => {
  const router = Router();

  router.get(["/"], await readHealth());

  return router;
};
