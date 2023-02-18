import { Router } from "express";

import { readAbout } from "./about.controller";

/**
 * The about router for a qanary component
 */
export const aboutRouter = async (): Promise<Router> => {
  const router: Router = Router();

  router.get(["/", "/about"], await readAbout());

  return router;
};
