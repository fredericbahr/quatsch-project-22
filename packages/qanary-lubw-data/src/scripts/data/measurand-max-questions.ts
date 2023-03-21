import { TrainingQuestion } from "../types";

export const questionsStationMeasurandCalculationMeasurandMax: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station, calculation }) =>
      `Welcher ist der ${calculation} Messwert für ${measurand} in ${station}?`,
    calculationAllowList: ["maximal"],
    calculationSuffix: "e",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Was war der ${calculation} Messwert für ${measurand} in ${station}?`,
    calculationAllowList: ["höchste"],
  },
  {
    text: ({ measurand, station, calculation }) => `Was war das ${calculation} für ${measurand} in ${station}?`,
    calculationAllowList: ["Maximum"],
  },
  {
    text: ({ measurand, station }) => `Wie ist der maximale ${measurand}-Wert in ${station}?`,
  },
];
