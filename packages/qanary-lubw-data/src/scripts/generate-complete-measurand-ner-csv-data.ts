import * as fs from "fs";

import { basePaths } from "./base-paths";
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

  fs.writeFile(basePaths.trainCSV, trainCsv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component training data written to '${basePaths.trainCSV}'`);
    }
  });
  fs.writeFile(basePaths.testCSV, testCsv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component testing data written to '${basePaths.testCSV}'`);
    }
  });
};

const baseData = generateNerDomainBaseData();
const data = generateNerTrainingData();
writeCsvFile(data, baseData);
