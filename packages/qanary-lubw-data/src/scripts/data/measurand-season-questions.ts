import { TrainingQuestion } from "../types";

export const questionsStationMeasurandCalculationMeasurandSeason: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station }) => `Was ist der typische ${measurand}-Messwert in ${station} für diese Jahreszeit?`,
  },
  {
    text: ({ measurand, station }) =>
      `Wie hoch ist der typische ${measurand}-Messwert in ${station} für diese Jahreszeit?`,
  },
];
