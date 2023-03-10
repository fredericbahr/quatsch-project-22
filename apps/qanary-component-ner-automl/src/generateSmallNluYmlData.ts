import * as fs from "fs";

import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateSmallNluTrainingData } from "./generateTrainingData/generateSmallNluTrainingData";
import { NluTrainingData } from "./types";

/**
 * Writes provided data with necessary structure for rasa nlu into ../rasa/data/nlu/air-measurand.yml file
 * @param data training data array
 */
const writeYmlFile = (data: Array<NluTrainingData>): void => {
  const trainYml = generateNluYmlFileContent(data.filter(() => Math.random() <= 0.25));

  fs.writeFile("../rasa/data/nlu/air-measurand.yml", trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("rasa nlu examples written to '../rasa/data/nlu/air-measurand.yml'");
    }
  });
};

const data = generateSmallNluTrainingData();
writeYmlFile(data);
