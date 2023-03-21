import { TrainingQuestion } from "../types";

export const questionsStationMeasurandCalculationMeasurandMin: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station, calculation }) =>
      `Welcher ist der ${calculation} Messwert für ${measurand} in ${station}?`,
    calculationAllowList: ["minimal"],
    calculationSuffix: "e",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Was war der ${calculation} Messwert für ${measurand} in ${station}?`,
    calculationAllowList: ["niedrigste"],
  },
  {
    text: ({ measurand, station, calculation }) => `Was war das ${calculation} für ${measurand} in ${station}?`,
    calculationAllowList: ["Minimum"],
  },
  {
    text: ({ measurand, station }) => `Wie ist der minimale ${measurand}-Wert in ${station}?`,
  },
];
