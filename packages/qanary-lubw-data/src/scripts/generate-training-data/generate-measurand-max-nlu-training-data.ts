import { questionsStationMeasurandCalculationMeasurandMax } from "../data/measurand-max-questions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generate-training-data";

/**
 * Generates a training set for a rasa nlu for measurand max intent.
 * @returns generated nlu training data array
 */
export const generateMeasurandMaxNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandMax, nluData);

  return nluData;
};
