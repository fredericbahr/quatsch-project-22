import { questionsStationMeasurandCalculationMeasurandMin } from "../data/measurandMinQuestions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generateTrainingData";

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateMeasurandMinNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandMin, nluData);

  return nluData;
};
