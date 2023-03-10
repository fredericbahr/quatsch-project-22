import { NluTrainingData } from "../types";

/**
 * Generates rasa nlu training data as yml file content string
 * @param data training data array
 * @returns the training yml string
 */
const generateNluYmlFileContent = (data: Array<NluTrainingData>): string => {
  const trainYml = `version: "3.1"

nlu:
  ## Creation of context
  - intent: measurand_complete
    examples: |
      - ${data.join("\n      - ")}`;

  return trainYml;
};

export default generateNluYmlFileContent;
