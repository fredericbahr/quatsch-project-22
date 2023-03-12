import { questionsStationMeasurandCalculationMeasurandMax } from "../data/measurandMaxQuestions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generateTrainingData";

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateMeasurandMaxNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandMax, nluData);

  return nluData;
};
