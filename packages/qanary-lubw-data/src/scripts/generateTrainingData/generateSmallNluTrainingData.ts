import { questionsStationMeasurand } from "../data/trainingQuestions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandData } from "./generateTrainingData";

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateSmallNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandData("nlu", questionsStationMeasurand, nluData);

  return nluData;
};
