import {
  questionsStationMeasurand,
  questionsStationMeasurandCalculation,
  questionsStationMeasurandRepresentation,
  questionsStationMeasurandRepresentationCalculation,
} from "../data/training-questions";
import { NerTrainingData } from "../types";
import {
  generateStationMeasurandCalculationData,
  generateStationMeasurandData,
  generateStationMeasurandRepresentationCalculationData,
  generateStationMeasurandRepresentationData,
} from "./generate-training-data";

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
