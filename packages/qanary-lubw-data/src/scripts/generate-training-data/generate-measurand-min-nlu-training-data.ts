import { questionsStationMeasurandCalculationMeasurandMin } from "../data/measurand-min-questions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generate-training-data";

/**
 * Generates a training set for a rasa nlu for measurand min intent.
 * @returns generated nlu training data array
 */
export const generateMeasurandMinNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandMin, nluData);

  return nluData;
};
