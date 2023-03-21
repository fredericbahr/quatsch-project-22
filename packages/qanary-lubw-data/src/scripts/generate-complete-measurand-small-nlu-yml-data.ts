import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateSmallNluTrainingData } from "./generate-training-data/generate-small-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

const baseData = ["Wie ist der aktuelle Wert?", "Wie hoch ist der aktuelle Messwert?"];

writeYmlFileSlim({
  intent: "measurand_complete",
  data: generateSmallNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandCompleteYML,
  threshold: 0.2,
});
