import fs from "fs";

import { NerTrainingData } from "../types";
import randomSplitArray from "./randomSplitArray";

/**
 * Base option interface for `writeCsvFile` and `writeCsvFileTestAndTrain` functions.
 */
export interface IWriteCsvFileBase {
  /** training data array to save to the file */
  data: Array<NerTrainingData>;
  /** base training data that will be added to normal data */
  baseData?: Array<NerTrainingData>;
  /** function to generate the actual file content from the training data */
  generateNerCsvFileContent: (trainingData: Array<NerTrainingData>) => string;
}

export interface IWriteCsvFile extends IWriteCsvFileBase {
  /** path to save generated file to */
  path: string;
}

export interface IWriteCsvFileTestAndTrain extends IWriteCsvFileBase {
  /** path to save generated file of training data to */
  trainPath: string;
  /** path to save generated file of testing data to */
  testPath: string;
}

/**
 * Generates csv file content with necessary structure for qanary ner component and saves it as csv file.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeCsvFile = (options: IWriteCsvFile): void => {
  const joinedTrainData: Array<NerTrainingData> = [...(options.baseData || []), ...options.data];
  const trainCsv = options.generateNerCsvFileContent(joinedTrainData);

  fs.writeFile(options.path, trainCsv, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`qanary ner component training data written to '${options.path}'`);
    }
  });
};

/**
 * Generates csv file contents with necessary structure for qanary ner component and saves it as csv files.
 * Additionaly randomly splits data into training and testing data and saves then into two files.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeCsvFileTestAndTrain = (options: IWriteCsvFileTestAndTrain): void => {
  const [trainData, testData] = randomSplitArray<NerTrainingData>(options.data);

  writeCsvFile({
    data: trainData,
    baseData: options.baseData,
    generateNerCsvFileContent: options.generateNerCsvFileContent,
    path: options.trainPath,
  });
  writeCsvFile({
    data: testData,
    baseData: options.baseData,
    generateNerCsvFileContent: options.generateNerCsvFileContent,
    path: options.testPath,
  });
};
