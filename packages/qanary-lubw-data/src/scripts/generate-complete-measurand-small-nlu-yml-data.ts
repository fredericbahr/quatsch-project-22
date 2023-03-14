import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateSmallNluTrainingData } from "./generate-training-data/generate-small-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateSmallNluTrainingData(),
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.25,
});
