import { NluTrainingData } from "../types";

/**
 * Generates rasa nlu training data as yml file content string
 * @param data training data array
 * @param intent rasa intent
 * @returns the training yml string
 */
const generateNluYmlFileContent = (data: Array<NluTrainingData>, intent: string): string => {
  const trainYml = `# Automatically generated file. Do not change the content

version: "3.1"

nlu:
  - intent: ${intent}
    examples: |
      - ${data.join("\n      - ")}`;

  return trainYml;
};

export default generateNluYmlFileContent;
