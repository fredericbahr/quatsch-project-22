import { questionsStationMeasurandCalculationMeasurandSeason } from "../data/measurand-season-questions";
import { NluTrainingData } from "../types";
import { generateStationMeasurandCalculationData } from "./generate-training-data";

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateMeasurandSeasonNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculationMeasurandSeason, nluData);

  return nluData;
};
