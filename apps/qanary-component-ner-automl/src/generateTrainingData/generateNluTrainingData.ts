import {
  questionsStationMeasurand,
  questionsStationMeasurandCalculation,
  questionsStationMeasurandRepresentation,
  questionsStationMeasurandRepresentationCalculation,
} from "../data/trainingQuestions";
import { NluTrainingData } from "../types";
import {
  generateStationMeasurandCalculationData,
  generateStationMeasurandData,
  generateStationMeasurandRepresentationCalculationData,
  generateStationMeasurandRepresentationData,
} from "./generateTrainingData";

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandData("nlu", questionsStationMeasurand, nluData);
  generateStationMeasurandRepresentationData("nlu", questionsStationMeasurandRepresentation, nluData);
  generateStationMeasurandCalculationData("nlu", questionsStationMeasurandCalculation, nluData);
  generateStationMeasurandRepresentationCalculationData(
    "nlu",
    questionsStationMeasurandRepresentationCalculation,
    nluData,
  );

  return nluData;
};
