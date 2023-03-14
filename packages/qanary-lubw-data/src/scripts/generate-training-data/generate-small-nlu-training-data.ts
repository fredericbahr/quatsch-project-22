import { questionsStationMeasurand } from "../data/training-questions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandData } from "./generate-training-data";

/**
 * Generates a small training set for a rasa nlu with only basic question.
 * @returns generated nlu training data array
 */
export const generateSmallNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandData("nlu", questionsStationMeasurand, nluData);

  return nluData;
};
