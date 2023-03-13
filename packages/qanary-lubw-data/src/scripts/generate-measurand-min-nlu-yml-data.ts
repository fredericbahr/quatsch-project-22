import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateMeasurandMinNluTrainingData } from "./generate-training-data/generate-measurand-min-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

const baseData = ["Was war der niedrigste Messwert?", "Welcher ist der minimale Messwert?", "Was war das Minimum?"];

writeYmlFileSlim({
  intent: "measurand_min",
  data: generateMeasurandMinNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandMinYML,
  threshold: 0.05,
});
