import { ILUBWData } from "../interfaces/lubw";

/**
 * The default LUBW data.
 */
export const defaultLUBWData: ILUBWData = {
  measurand: "luqx", // Luftqualitätsindex
  station: "DEBW081", // Karlsruhe Nordwest
  representation: "text",
  calculation: "average",
  time: "1d",
};
