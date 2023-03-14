import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateNluTrainingData } from "./generate-training-data/generate-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateNluTrainingData(),
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.05,
});
