import { NerTrainingData } from "../types";

export type DataKey = "trainingdata" | "testingdata";

/**
 * Generates qanary ner component training data as json file content string
 * @param data training data array
 * @param dataKey key to use in output json, either "trainingdata" or "testingdata"
 * @returns the training json string
 */
const generateNerJsonFileContent = (data: Array<NerTrainingData>, dataKey: DataKey): string => {
  const trainJson: { [x: string]: Array<NerTrainingData> } = {
    [dataKey]: data,
  };

  return JSON.stringify(trainJson, null, 2);
};

export default generateNerJsonFileContent;
