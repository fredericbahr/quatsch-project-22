import { ICalculation } from "../interfaces/calculation";

/** the calculation types for the lubw measurand data */
export const calculations: ICalculation[] = [
  {
    id: "minimum",
    label: "Minimum",
  },
  {
    id: "maximum",
    label: "Maximum",
  },
  {
    id: "average",
    label: "Durchschnitt",
  },
];

/** the calculation types for bot output */
export const calculationLabels: ICalculation[] = [
  {
    id: "minimum",
    label: "minimale",
  },
  {
    id: "maximum",
    label: "maximale",
  },
  {
    id: "average",
    label: "durchschnittliche",
  },
];
