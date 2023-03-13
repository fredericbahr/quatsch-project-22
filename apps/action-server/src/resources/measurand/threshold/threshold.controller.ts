import { ILUBWData, RasaRequest, RasaResponse } from "shared";

import { abstractRequestHandler } from "../abstract/abstract.controller";

/**
 * Handles the intent/action of `action_measurand_treshold` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const thresholdRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const enforcedLUBWData: Partial<ILUBWData> = {};
  await abstractRequestHandler(req, res, enforcedLUBWData);
};
