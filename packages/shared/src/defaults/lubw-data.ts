import { ILUBWData } from "../interfaces/lubw";

export type ILUBWDefaultData = Pick<ILUBWData, "calculation" | "representation" | "time">;

/**
 * The default LUBW data.
 */
export const defaultLUBWData: ILUBWDefaultData = {
  representation: "text",
  calculation: "average",
  time: "1d",
};
