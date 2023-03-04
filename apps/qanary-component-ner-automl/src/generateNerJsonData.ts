import * as fs from "fs";

import generateNerJsonFileContent from "./generateFileContent/generateNerJsonFileContent";
import { generateNerTrainingData } from "./generateTrainingData/generateNerTrainingData";
import { NerTrainingData } from "./types";
import randomSplitArray from "./utils/randomSplitArray";

/**
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.json and trainingdata/test.json files
 * @param data training data array
 */
const writeJsonFile = (data: Array<NerTrainingData>): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(data);
  const trainJson = generateNerJsonFileContent(trainData, "trainingdata");
  const testJson = generateNerJsonFileContent(testData, "testingdata");

  fs.writeFile("trainingdata/train.json", trainJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component training data written to 'trainingdata/train.json'");
    }
  });
  fs.writeFile("trainingdata/test.json", testJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component testing data written to 'trainingdata/test.json'");
    }
  });
};

const data = generateNerTrainingData();
writeJsonFile(data);
