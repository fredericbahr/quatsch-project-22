import fs from "fs";

import { DataKey } from "../generateFileContent/generateNerJsonFileContent";
import { NerTrainingData } from "../types";
import randomSplitArray from "./randomSplitArray";

/**
 * Base option interface for `writeJsonFile` and `writeJsonFileTestAndTrain` functions.
 */
export interface IWriteJsonFileBase {
  /** training data array to save to the file */
  data: Array<NerTrainingData>;
  /** base training data that will be added to normal data */
  baseData?: Array<NerTrainingData>;
  /** function to generate the actual file content from the training data */
  generateNerJsonFileContent: (trainingData: Array<NerTrainingData>, dataKey: DataKey) => string;
}

/**
 * The options for the `writeJsonFileTestAndTrain` function.
 */
export interface IWriteJsonFile extends IWriteJsonFileBase {
  /** path to save generated file to */
  path: string;
  /** key for data that is written into the file, either "trainingdata" or "testingdata"  */
  dataKey: DataKey;
}

/**
 * The options for the `writeJsonFile` function.
 */
export interface IWriteJsonFileTestAndTrain extends IWriteJsonFileBase {
  /** path to save generated file of training data to */
  trainPath: string;
  /** path to save generated file of testing data to */
  testPath: string;
}

/**
 * Generates json file content with necessary structure for qanary ner component and saves it as json file.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeJsonFile = (options: IWriteJsonFile): void => {
  const joinedTrainData: Array<NerTrainingData> = [...(options.baseData || []), ...options.data];
  const trainJson = options.generateNerJsonFileContent(joinedTrainData, options.dataKey);

  fs.writeFile(options.path, trainJson, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component training data written to '${options.path}'`);
    }
  });
};

/**
 * Generates json file contents with necessary structure for qanary ner component and saves it as json files.
 * Additionaly randomly splits data into training and testing data and saves then into two files.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeJsonFileTestAndTrain = (options: IWriteJsonFileTestAndTrain): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(options.data);

  writeJsonFile({
    data: trainData,
    baseData: options.baseData,
    generateNerJsonFileContent: options.generateNerJsonFileContent,
    path: options.trainPath,
    dataKey: "trainingdata",
  });
  writeJsonFile({
    data: testData,
    baseData: options.baseData,
    generateNerJsonFileContent: options.generateNerJsonFileContent,
    path: options.testPath,
    dataKey: "testingdata",
  });
};
