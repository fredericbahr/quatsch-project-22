import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateNluTrainingData } from "./generateTrainingData/generateNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateNluTrainingData(),
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.05,
});
