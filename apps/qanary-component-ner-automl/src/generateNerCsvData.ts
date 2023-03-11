import * as fs from "fs";

import generateNerCsvFileContent from "./generateFileContent/generateNerCsvFileContent";
import generateNerDomainBaseData from "./generateTrainingData/generateNerDomainBaseData";
import { generateNerTrainingData } from "./generateTrainingData/generateNerTrainingData";
import { NerTrainingData } from "./types";
import randomSplitArray from "./utils/randomSplitArray";

/**
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.csv and trainingdata/test.csv files.
 * @param data data array randomly split into training and testing data
 * @param baseData data array added to training and testing data
 */
const writeCsvFile = (data: Array<NerTrainingData>, baseData: Array<NerTrainingData>): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(data);
  const trainCsv = generateNerCsvFileContent([...baseData, ...trainData]);
  const testCsv = generateNerCsvFileContent([...baseData, ...testData]);

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

const baseData = generateNerDomainBaseData();
const data = generateNerTrainingData();
writeCsvFile(data, baseData);
