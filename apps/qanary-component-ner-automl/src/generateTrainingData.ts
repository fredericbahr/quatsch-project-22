import generateLubwData from "./generateLubwData";
import {
  DomainTemplate,
  questionsStationMeasurand,
  questionsStationMeasurandCalculation,
  questionsStationMeasurandRepresentation,
  questionsStationMeasurandRepresentationCalculation,
  TrainingQuestion,
} from "./trainingQuestions";

const { calculations, measurands, representations, stations } = generateLubwData();

type DataVariant = "ner" | "nlu";

export type NerTrainingData = {
  text: string;
  language: string;
  entities: DomainTemplate;
};

export type NluTrainingData = string;

/**
 * Generates a string out of a given input base string and a prefix and suffix.
 * @param baseString base string to be extended
 * @param prefix
 * @param suffix
 * @returns a pre- and suffixed string or undefined
 */
const generateString = (baseString?: string, prefix = "", suffix = ""): string | undefined => {
  return baseString ? `${prefix}${baseString}${suffix}` : undefined;
};

/**
 * Generates ner training data object from question and provided domain strings.
 * @param question question object
 * @param station
 * @param measurand
 * @param representation
 * @param calculation
 * @returns ner training data object
 */
const generateNerDataEntry = (
  question: TrainingQuestion,
  station?: string,
  measurand?: string,
  representation?: string,
  calculation?: string,
): NerTrainingData => {
  const trainingDataNer: NerTrainingData = {
    text: question.text({
      station,
      measurand,
      representation,
      calculation,
    }),
    language: "de",
    entities: {
      station,
      measurand,
      representation,
      calculation,
    },
  };

  return trainingDataNer;
};

/**
 * Generates nlu training data object from question and provided domain strings.
 * @param question question object
 * @param station
 * @param measurand
 * @param representation
 * @param calculation
 * @returns nlu training data object
 */
const generateNluDataEntry = (
  question: TrainingQuestion,
  station?: string,
  measurand?: string,
  representation?: string,
  calculation?: string,
): NluTrainingData => {
  const trainingDataNlu: NluTrainingData = question.text({
    station,
    measurand,
    representation,
    calculation,
  });

  return trainingDataNlu;
};

/**
 * Generates training data for ner or nlu from question and provided domain templates depending on variant.
 * @param question question object
 * @param templates object containing station, measurand, representation, calculation template strings
 * @param variant data variant, either 'ner' or 'nlu'
 * @returns nlu or ner training data object
 */
const generateTrainingDataEntry = (
  question: TrainingQuestion,
  templates: DomainTemplate,
  variant: DataVariant,
): NerTrainingData | NluTrainingData => {
  const { station, measurand, representation, calculation } = templates;

  const measurandString = generateString(measurand, question.measurandPrefix, question.measurandSuffix);
  const representationString = generateString(
    representation,
    question.representationPrefix,
    question.representationSuffix,
  );
  const calculationString = generateString(calculation, question.calculationPrefix, question.calculationSuffix);

  if (variant === "ner") {
    return generateNerDataEntry(question, station, measurandString, representationString, calculationString);
  } else {
    return generateNluDataEntry(question, station, measurandString, representationString, calculationString);
  }
};

/**
 * Generates training data in provided variant for questions with station and measurand slots and adds data to lists
 * @param variant data variant, either 'ner' or 'nlu'
 * @param list ner or nlu data array where results will be added to
 */
const generateStationMeasurandData = (variant: DataVariant, list: Array<NerTrainingData | NluTrainingData>): void => {
  questionsStationMeasurand.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList?.includes(measurand))
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
 * Generates training data in provided variant for questions with station, measurand and representation slots and adds data to lists
 * @param variant data variant, either 'ner' or 'nlu'
 * @param list ner or nlu data array where results will be added to
 */
const generateStationMeasurandRepresentationData = (
  variant: DataVariant,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questionsStationMeasurandRepresentation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList?.includes(measurand))
        .forEach((measurand) => {
          representations
            .filter((representation) => question.representationAllowList?.includes(representation))
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
 * Generates training data in provided variant for questions with station, measurand and calculation slots and adds data to lists
 * @param variant data variant, either 'ner' or 'nlu'
 * @param list ner or nlu data array where results will be added to
 */
const generateStationMeasurandCalculationData = (
  variant: DataVariant,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questionsStationMeasurandCalculation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList?.includes(measurand))
        .forEach((measurand) => {
          calculations
            .filter((calculation) => question.calculationAllowList?.includes(calculation))
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
 * Generates training data in provided variant for questions with station, measurand, representation and calculation slots and adds data to lists
 * @param variant data variant, either 'ner' or 'nlu'
 * @param list ner or nlu data array where results will be added to
 */
const generateStationMeasurandRepresentationCalculationData = (
  variant: DataVariant,
  list: Array<NerTrainingData | NluTrainingData>,
): void => {
  questionsStationMeasurandRepresentationCalculation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList?.includes(measurand))
        .forEach((measurand) => {
          representations
            .filter((representation) => question.representationAllowList?.includes(representation))
            .forEach((representation) => {
              calculations
                .filter((calculation) => question.calculationAllowList?.includes(calculation))
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

/**
 * Generates a training set for a ner component for all lubw domains.
 * @returns generated ner training data array
 */
export const generateNerTrainingData = (): Array<NerTrainingData> => {
  const nerData: Array<NerTrainingData> = [];

  generateStationMeasurandData("ner", nerData);
  generateStationMeasurandRepresentationData("ner", nerData);
  generateStationMeasurandCalculationData("ner", nerData);
  generateStationMeasurandRepresentationCalculationData("ner", nerData);

  return nerData;
};

/**
 * Generates a training set for a rasa nlu for all lubw domains.
 * @returns generated nlu training data array
 */
export const generateNluTrainingData = (): Array<NluTrainingData> => {
  const nluData: Array<NluTrainingData> = [];

  generateStationMeasurandData("nlu", nluData);
  generateStationMeasurandRepresentationData("nlu", nluData);
  generateStationMeasurandCalculationData("nlu", nluData);
  generateStationMeasurandRepresentationCalculationData("nlu", nluData);

  return nluData;
};
