import * as fs from "fs";

import { generateNluTrainingData, NluTrainingData } from "./generateTrainingData";

/**
 * Writes provided data with necessary structure for rasa nlu into ../rasa/data/nlu/air-measurand.yml file
 * @param data training data array
 */
const writeYmlFile = (data: Array<NluTrainingData>): void => {
  const trainYml = `version: "3.1"

nlu:
  ## Creation of context
  - intent: context_air_measurand
    examples: |
    - ${data.join("\n    - ")}`;

  fs.writeFile("../rasa/data/nlu/air-measurand.yml", trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("rasa nlu examples written to '../rasa/data/nlu/air-measurand.yml'");
    }
  });
};

const data = generateNluTrainingData();
writeYmlFile(data);
