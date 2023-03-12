import { CALCULATION_TYPE, ILUBWData, ILUBWDataKey, RasaRequest, RasaResponse } from "shared";

import { abstractRequestHandler } from "../abstract/abstract.controller";

/**
 * Handles the intent/action of `action_measurand_complete` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const maxRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const enforcedLUBWData: Partial<ILUBWData> = { [ILUBWDataKey.Calculation]: CALCULATION_TYPE.Maximum };
  await abstractRequestHandler(req, res, enforcedLUBWData);
};
