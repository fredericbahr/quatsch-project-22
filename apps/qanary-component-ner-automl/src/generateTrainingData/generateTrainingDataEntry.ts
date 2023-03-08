import { DataVariant, DomainTemplate, NerTrainingData, NluTrainingData, TrainingQuestion } from "../types";
import preAndSuffixString from "../utils/preAndSuffixString";

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

  const measurandString = preAndSuffixString(measurand, question.measurandPrefix, question.measurandSuffix);
  const representationString = preAndSuffixString(
    representation,
    question.representationPrefix,
    question.representationSuffix,
  );
  const calculationString = preAndSuffixString(calculation, question.calculationPrefix, question.calculationSuffix);

  switch (variant) {
    case "ner":
      return generateNerDataEntry(question, station, measurandString, representationString, calculationString);
    case "nlu":
      return generateNluDataEntry(question, station, measurandString, representationString, calculationString);
  }
};

export default generateTrainingDataEntry;
