import * as fs from "fs";

import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateNluTrainingData } from "./generateTrainingData/generateNluTrainingData";
import { NluTrainingData } from "./types";

/**
 * Writes provided data with necessary structure for rasa nlu into ../rasa/data/nlu/complete-measurand.yml file
 * @param data training data array
 */
const writeYmlFile = (data: Array<NluTrainingData>): void => {
  const trainYml = generateNluYmlFileContent(data.filter(() => Math.random() <= 0.05));

  fs.writeFile("../rasa/data/nlu/complete-measurand.yml", trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("rasa nlu examples written to '../rasa/data/nlu/complete-measurand.yml'");
    }
  });
};

const data = generateNluTrainingData();
writeYmlFile(data);
