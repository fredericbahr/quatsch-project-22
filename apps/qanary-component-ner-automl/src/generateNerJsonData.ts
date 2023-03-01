import * as fs from "fs";

import { generateNerTrainingData, NerTrainingData } from "./generateTrainingData";

/**
 * Writes provided data with necessary structure for qanary ner component into trainingdata/train.json and trainingdata/test.json files
 * @param data training data array
 */
const writeJsonFile = (data: Array<NerTrainingData>): void => {
  const trainJson: { trainingdata: Array<NerTrainingData> } = {
    trainingdata: [],
  };
  const testJson: { testingdata: Array<NerTrainingData> } = {
    testingdata: [],
  };

  data.forEach((d) => {
    if (Math.random() < 0.5) {
      trainJson.trainingdata.push(d);
    } else {
      testJson.testingdata.push(d);
    }
  });

  fs.writeFile("trainingdata/train.json", JSON.stringify(trainJson, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component training data written to 'trainingdata/train.json'");
    }
  });
  fs.writeFile("trainingdata/test.json", JSON.stringify(testJson, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component testing data written to 'trainingdata/test.json'");
    }
  });
};

const data = generateNerTrainingData();
writeJsonFile(data);
