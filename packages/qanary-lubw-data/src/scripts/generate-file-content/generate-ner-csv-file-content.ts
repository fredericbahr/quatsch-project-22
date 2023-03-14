import { NerTrainingData } from "../types";

/**
 * Generates a qanary ner component training data csv entry from provided entry object
 * @param entry object containing the text and all matched entities
 * @returns csv entry string
 */
const generateCsvEntryString = (entry: NerTrainingData): string => {
  return `\n"${entry.text}",${entry.entities.station || ""},${entry.entities.measurand || ""},${
    entry.entities.calculation || ""
  },${entry.entities.representation || ""}`;
};

/**
 * Generates qanary ner component training data as csv file content string
 * @param data training data array
 * @returns the training csv string
 */
const generateNerCsvFileContent = (data: Array<NerTrainingData>): string => {
  let trainCsv = "text,station,measurand,calculation,representation";

  data.forEach((d) => {
    trainCsv = trainCsv.concat(generateCsvEntryString(d));
  });

  return trainCsv;
};

export default generateNerCsvFileContent;
