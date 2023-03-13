import * as fs from "fs";

import { basePaths } from "./base-paths";
import generateNerJsonFileContent from "./generate-file-content/generate-ner-json-file-content";
import generateNerDomainBaseData from "./generate-training-data/generate-ner-domain-base-data";
import { generateNerTrainingData } from "./generate-training-data/generate-ner-training-data";
import { NerTrainingData } from "./types";
import randomSplitArray from "./utils/random-split-array";

/**
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.json and trainingdata/test.json files.
 * @param data data array randomly split into training and testing data
 * @param baseData data array added to training and testing data
 */
const writeJsonFile = (data: Array<NerTrainingData>, baseData: Array<NerTrainingData>): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(data);
  const trainJson = generateNerJsonFileContent([...baseData, ...trainData], "trainingdata");
  const testJson = generateNerJsonFileContent([...baseData, ...testData], "testingdata");

  fs.writeFile(basePaths.trainJSON, trainJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component training data written to '${basePaths.trainJSON}'`);
    }
  });
  fs.writeFile(basePaths.testJSON, testJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component training data written to '${basePaths.testJSON}'`);
    }
  });
};

const baseData = generateNerDomainBaseData();
const data = generateNerTrainingData();
writeJsonFile(data, baseData);
