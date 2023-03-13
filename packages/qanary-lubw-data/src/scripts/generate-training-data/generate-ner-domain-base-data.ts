import { NerTrainingData } from "../types";
import generateLubwData from "../utils/generateLubwData";

const { calculations, measurands, representations, stations } = generateLubwData();
/**
 * Generates ner training data object from domain entry name and provided entityKey.
 *
 * @example Base domain entry ner training data object for a station
 * ```ts
 *  const example: NerTrainingData = {
 *    text: "Kehl",
 *    language: "de",
 *    entities: {
 *      station: "Kehl",
 *    }
 *  }
 * ```
 *
 * @param domainEntry domain entry name used as text and entity
 * @param entityKey
 * @returns ner training data object for base domain entry
 */
const generateNerDomainBaseDataEntry = (domainEntry: string, entityKey: string): NerTrainingData => {
  const trainingDataNer: NerTrainingData = {
    text: domainEntry,
    language: "de",
    entities: {
      [entityKey]: domainEntry,
    },
  };

  return trainingDataNer;
};

/**
 * Generates ner training data for for all base domain instances (all calculations, measurands, representations, stations).
 * @returns generated ner training data array of base domain instances
 */
const generateNerDomainBaseData = (): Array<NerTrainingData> => {
  const nerData: Array<NerTrainingData> = [];

  stations.forEach((station) => {
    const trainingDataNer: NerTrainingData = generateNerDomainBaseDataEntry(station, "station");
    nerData.push(trainingDataNer);
  });

  measurands.forEach((measurand) => {
    const trainingDataNer: NerTrainingData = generateNerDomainBaseDataEntry(measurand, "measurand");
    nerData.push(trainingDataNer);
  });

  calculations.forEach((calculation) => {
    const trainingDataNer: NerTrainingData = generateNerDomainBaseDataEntry(calculation, "calculation");
    nerData.push(trainingDataNer);
  });

  representations.forEach((representation) => {
    const trainingDataNer: NerTrainingData = generateNerDomainBaseDataEntry(representation, "representation");
    nerData.push(trainingDataNer);
  });

  return nerData;
};

export default generateNerDomainBaseData;
