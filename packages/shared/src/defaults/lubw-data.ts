import { CALCULATION_TYPE } from "../enums/calculation";
import { REPRESENTATION_TYPE } from "../enums/representation";
import { ILUBWDefaultData } from "../interfaces/lubw";

/**
 * The default LUBW data.
 */
export const defaultLUBWData: ILUBWDefaultData = {
  representation: REPRESENTATION_TYPE.Text,
  calculation: CALCULATION_TYPE.Average,
  time: "1d",
};
