import * as fs from "fs";

import generateNerCsvFileContent from "./generateFileContent/generateNerCsvFileContent";
import { generateNerTrainingData } from "./generateTrainingData/generateNerTrainingData";
import { NerTrainingData } from "./types";
import randomSplitArray from "./utils/randomSplitArray";

/**
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.csv and trainingdata/test.csv files
 * @param data training data array
 */
const writeCsvFile = (data: Array<NerTrainingData>): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(data);
  const trainCsv = generateNerCsvFileContent(trainData);
  const testCsv = generateNerCsvFileContent(testData);

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
