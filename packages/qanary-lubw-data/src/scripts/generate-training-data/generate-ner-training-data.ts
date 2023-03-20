import { questionsStationMeasurandCalculationMeasurandMax } from "../data/measurand-max-questions";
import { questionsStationMeasurandCalculationMeasurandMin } from "../data/measurand-min-questions";
import { questionsStationMeasurandCalculationMeasurandSeason } from "../data/measurand-season-questions";
import {
  questionsCalculation,
  questionsStationMeasurand,
  questionsStationMeasurandCalculation,
  questionsStationMeasurandRepresentation,
  questionsStationMeasurandRepresentationCalculation,
} from "../data/training-questions";
import { NerTrainingData } from "../types";
import {
  generateCalculationData,
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

  generateCalculationData("ner", questionsCalculation, nerData);
  generateStationMeasurandData("ner", questionsStationMeasurand, nerData);
  generateStationMeasurandRepresentationData("ner", questionsStationMeasurandRepresentation, nerData);
  generateStationMeasurandCalculationData("ner", questionsStationMeasurandCalculation, nerData);
  generateStationMeasurandRepresentationCalculationData(
    "ner",
    questionsStationMeasurandRepresentationCalculation,
    nerData,
  );
  generateStationMeasurandCalculationData("ner", questionsStationMeasurandCalculationMeasurandMax, nerData);
  generateStationMeasurandCalculationData("ner", questionsStationMeasurandCalculationMeasurandMin, nerData);
  generateStationMeasurandData("ner", questionsStationMeasurandCalculationMeasurandSeason, nerData);

  return nerData;
};
