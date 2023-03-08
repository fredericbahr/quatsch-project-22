import {
  questionsStationMeasurand,
  questionsStationMeasurandCalculation,
  questionsStationMeasurandRepresentation,
  questionsStationMeasurandRepresentationCalculation,
} from "../data/trainingQuestions";
import { NerTrainingData } from "../types";
import {
  generateStationMeasurandCalculationData,
  generateStationMeasurandData,
  generateStationMeasurandRepresentationCalculationData,
  generateStationMeasurandRepresentationData,
} from "./generateTrainingData";

/**
 * Generates a training set for a ner component for all lubw domains.
 * @returns generated ner training data array
 */
export const generateNerTrainingData = (): Array<NerTrainingData> => {
  const nerData: Array<NerTrainingData> = [];

  generateStationMeasurandData("ner", questionsStationMeasurand, nerData);
  generateStationMeasurandRepresentationData("ner", questionsStationMeasurandRepresentation, nerData);
  generateStationMeasurandCalculationData("ner", questionsStationMeasurandCalculation, nerData);
  generateStationMeasurandRepresentationCalculationData(
    "ner",
    questionsStationMeasurandRepresentationCalculation,
    nerData,
  );

  return nerData;
};
