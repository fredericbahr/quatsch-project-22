import { TrainingQuestion } from "../types";

export const questionsStationMeasurandCalculationMeasurandThreshold: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station }) => `Ist der ${measurand}-Wert für die Station ${station} grenzwertig?`,
  },
  {
    text: ({ measurand, station }) => `Ist der ${measurand}-Wert für die Station ${station} extrem?`,
  },
  {
    text: ({ measurand, station }) => `Ist der ${measurand}-Wert für die Station ${station} gefährlich?`,
  },
  {
    text: ({ measurand, station }) => `Liegt der ${measurand}-Wert für die Station ${station} über einem Grenzwert?`,
  },
];
