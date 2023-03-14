import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateSmallNluTrainingData } from "./generateTrainingData/generateSmallNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateSmallNluTrainingData(),
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.25,
});
