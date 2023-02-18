import { Router } from "express";

import { createAnnotateQuestion } from "./annotatequestion.controller";
import { IQanaryComponentMessageHandler } from "./annotatequestion.model";

/**
 * The parameterized router for the annotatequestion resource
 */
export const annotateQuestionRouter = async (handler: IQanaryComponentMessageHandler): Promise<Router> => {
  const router: Router = Router();

  router.post(["/"], await createAnnotateQuestion(handler));

  return router;
};
