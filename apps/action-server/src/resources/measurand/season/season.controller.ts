import { sub } from "date-fns";
import { CALCULATION_TYPE, ILUBWData, RasaRequest, RasaResponse } from "shared";

import { abstractRequestHandler } from "../abstract/abstract.controller";

/**
 * Handles the intent/action of `action_measurand_season` by trying to answer the question with a Qanary pipeline.
 * @param req Request Object
 * @param res Response Object
 */
export const seasonRequestHandler = async (req: RasaRequest, res: RasaResponse) => {
  const enforcedLUBWData: Partial<ILUBWData> = {
    calculation: CALCULATION_TYPE.Average,
    time: {
      start: sub(new Date(), { months: 3 }),
      end: new Date(),
    },
  };
  await abstractRequestHandler(req, res, enforcedLUBWData);
};
