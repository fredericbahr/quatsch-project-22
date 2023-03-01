import * as fs from "fs";

import { generateNerTrainingData, NerTrainingData } from "./generateTrainingData";

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
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.csv and trainingdata/test.csv files
 * @param data training data array
 */
const writeCsvFile = (data: Array<NerTrainingData>): void => {
  let trainCsv = "text,station,measurand,calculation,representation";
  let testCsv = "text,station,measurand,calculation,representation";

  data.forEach((d) => {
    if (Math.random() < 0.5) {
      trainCsv = trainCsv.concat(generateCsvEntryString(d));
    } else {
      testCsv = testCsv.concat(generateCsvEntryString(d));
    }
  });

  fs.writeFile("trainingdata/train.csv", trainCsv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component training data written to 'trainingdata/train.csv'");
    }
  });
  fs.writeFile("trainingdata/test.csv", testCsv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component testing data written to 'trainingdata/test.csv'");
    }
  });
};

const data = generateNerTrainingData();
writeCsvFile(data);
