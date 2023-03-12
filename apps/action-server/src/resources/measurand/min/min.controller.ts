import { ILUBWData, ILUBWDataKey, RasaRequest, RasaResponse } from "shared";
import { CALCULATION_TYPE } from "shared";

import { abstractRequestHandler } from "../abstract/abstract.controller";

/**
 * Handler for finding the minimal value
 * @param req the request object
 * @param res the response object
 */
export const minRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const enforcedLUBWData: Partial<ILUBWData> = { [ILUBWDataKey.Calculation]: CALCULATION_TYPE.Minimum };
  await abstractRequestHandler(req, res, enforcedLUBWData);
};
