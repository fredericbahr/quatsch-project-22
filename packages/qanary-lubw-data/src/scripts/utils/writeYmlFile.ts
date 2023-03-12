import fs from "fs";

import { NluTrainingData } from "../types";
interface IWriteYmlFile {
  data: Array<NluTrainingData>;
  baseData?: Array<NluTrainingData>;
  generateNluYmlFileContent: (trainingData: Array<NluTrainingData>, intent: string) => string;
  path: string;
  intent: string;
}

interface IWriteYmlFileSlim extends IWriteYmlFile {
  threshold: number;
}

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

export const writeYmlFileSlim = (options: IWriteYmlFileSlim): void => {
  const data = options.data.filter(() => Math.random() <= options.threshold);

  writeYmlFile({
    ...options,
    data,
  });
};
