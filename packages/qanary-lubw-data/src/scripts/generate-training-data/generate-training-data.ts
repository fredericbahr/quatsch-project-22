import { DataVariant, NerTrainingData, NluTrainingData, TrainingQuestion } from "../types";
import generateLubwData from "../utils/generate-lubw-data";
import generateTrainingDataEntry from "./generate-training-data-entry";

const { calculations, measurands, representations, stations } = generateLubwData();

/**
 * Generates training data in provided variant for questions with station and measurand slots and adds data to lists.
 * @param variant data variant, either 'ner' or 'nlu'
 * @param questions array of training questions used as basis for training data
 * @param list ner or nlu data array where results will be added to
 */
export const generateStationMeasurandData = (
  variant: DataVariant,
  questions: Array<TrainingQuestion>,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questions.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => (question.measurandAllowList ? question.measurandAllowList.includes(measurand) : true))
        .forEach((measurand) => {
          const trainingData: NerTrainingData | NluTrainingData = generateTrainingDataEntry(
            question,
            { station, measurand },
            variant,
          );
          list.push(trainingData);
        });
    });
  });
};

/**
 * Generates training data in provided variant for questions with station, measurand and representation slots and adds data to lists.
 * @param variant data variant, either 'ner' or 'nlu'
 * @param questions array of training questions used as basis for training data
 * @param list ner or nlu data array where results will be added to
 */
export const generateStationMeasurandRepresentationData = (
  variant: DataVariant,
  questions: Array<TrainingQuestion>,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questions.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => (question.measurandAllowList ? question.measurandAllowList.includes(measurand) : true))
        .forEach((measurand) => {
          representations
            .filter((representation) =>
              question.representationAllowList ? question.representationAllowList.includes(representation) : true,
            )
            .forEach((representation) => {
              const trainingData: NerTrainingData | NluTrainingData = generateTrainingDataEntry(
                question,
                {
                  station,
                  measurand,
                  representation,
                },
                variant,
              );
              list.push(trainingData);
            });
        });
    });
  });
};

/**
 * Generates training data in provided variant for questions with station, measurand and calculation slots and adds data to lists.
 * @param variant data variant, either 'ner' or 'nlu'
 * @param questions array of training questions used as basis for training data
 * @param list ner or nlu data array where results will be added to
 */
export const generateStationMeasurandCalculationData = (
  variant: DataVariant,
  questions: Array<TrainingQuestion>,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questions.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => (question.measurandAllowList ? question.measurandAllowList.includes(measurand) : true))
        .forEach((measurand) => {
          calculations
            .filter((calculation) =>
              question.calculationAllowList ? question.calculationAllowList.includes(calculation) : true,
            )
            .forEach((calculation) => {
              const trainingData: NerTrainingData | NluTrainingData = generateTrainingDataEntry(
                question,
                {
                  station,
                  measurand,
                  calculation,
                },
                variant,
              );
              list.push(trainingData);
            });
        });
    });
  });
};

/**
 * Generates training data in provided variant for questions with station, measurand, representation and calculation slots and adds data to lists.
 * @param variant data variant, either 'ner' or 'nlu'
 * @param questions array of training questions used as basis for training data
 * @param list ner or nlu data array where results will be added to
 */
export const generateStationMeasurandRepresentationCalculationData = (
  variant: DataVariant,
  questions: Array<TrainingQuestion>,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questions.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => (question.measurandAllowList ? question.measurandAllowList.includes(measurand) : true))
        .forEach((measurand) => {
          representations
            .filter((representation) =>
              question.representationAllowList ? question.representationAllowList.includes(representation) : true,
            )
            .forEach((representation) => {
              calculations
                .filter((calculation) =>
                  question.calculationAllowList ? question.calculationAllowList.includes(calculation) : true,
                )
                .forEach((calculation) => {
                  const trainingData: NerTrainingData | NluTrainingData = generateTrainingDataEntry(
                    question,
                    {
                      station,
                      measurand,
                      representation,
                      calculation,
                    },
                    variant,
                  );
                  list.push(trainingData);
                });
            });
        });
    });
  });
};
