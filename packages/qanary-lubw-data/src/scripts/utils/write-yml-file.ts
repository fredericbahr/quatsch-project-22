import fs from "fs";

import { NluTrainingData } from "../types";

/**
 * The options for the `writeYmlFile` function.
 */
export interface IWriteYmlFile {
  /** training data array to save to the file */
  data: Array<NluTrainingData>;
  /** base training data that will be added to normal data */
  baseData?: Array<NluTrainingData>;
  /** function to generate the actual file content from the training data */
  generateNluYmlFileContent: (trainingData: Array<NluTrainingData>, intent: string) => string;
  /** path to save generated file to */
  path: string;
  /** rasa intent that is written into the file  */
  intent: string;
}

/**
 * The options for the `writeYmlFileSlim` function.
 */
export interface IWriteYmlFileSlim extends IWriteYmlFile {
  /** threshold used for random data filtering */
  threshold: number;
}

/**
 * Generates yml file content with necessary structure for rasa nlu and saves it as yml file.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeYmlFile = (options: IWriteYmlFile): void => {
  const joinedData: Array<NluTrainingData> = [...(options.baseData || []), ...options.data];
  const trainYml = options.generateNluYmlFileContent(joinedData, options.intent);

  fs.writeFile(options.path, trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`rasa nlu examples written to '${options.path}'`);
    }
  });
};

/**
 * Generates yml file content with necessary structure for rasa nlu and saves it as yml file.
 * Additionaly randomly filters data with provided threshold to decrease final file content.
 * @param options options object containing data, generation function and additional configurations
 */
export const writeYmlFileSlim = (options: IWriteYmlFileSlim): void => {
  const data = options.data.filter(() => Math.random() <= options.threshold);

  writeYmlFile({
    ...options,
    data,
  });
};
