import { questionsStationMeasurandCalculationMeasurandThreshold } from "../data/measurand-threshold-questions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generate-training-data";

/**
 * Generates a training set for a rasa nlu for measurand threshold intent.
 * @returns generated nlu training data array
 */
export const generateMeasurandThresholdNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandThreshold, nluData);

  return nluData;
};
