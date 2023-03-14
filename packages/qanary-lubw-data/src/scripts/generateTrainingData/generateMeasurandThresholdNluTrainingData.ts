import { questionsStationMeasurandCalculationMeasurandThreshold } from "../data/measurandThresholdQuestions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generateTrainingData";

/**
 * Generates a training set for a rasa nlu for measurand threshold intent.
 * @returns generated nlu training data array
 */
export const generateMeasurandThresholdNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandThreshold, nluData);

  return nluData;
};
