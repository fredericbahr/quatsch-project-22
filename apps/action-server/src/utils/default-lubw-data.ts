import { ILUBWData } from "../services/transformation-service";

/**
 * The default LUBW data.
 */
export const defaultLUBWData: ILUBWData = {
  measurand: "luqx", // Luftqualitaetsindex
  station: "DEBW081", // Karlsruhe Nordwest
  representation: "text",
  calculation: "average",
  time: "1d",
};
