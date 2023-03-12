import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateSmallNluTrainingData } from "./generateTrainingData/generateSmallNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

/**
 * Writes provided data with necessary structure for rasa nlu into ../rasa/data/nlu/complete-measurand.yml file
 */
writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateSmallNluTrainingData(),
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.25,
});
