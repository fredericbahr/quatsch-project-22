import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateMeasurandMaxNluTrainingData } from "./generate-training-data/generate-measurand-max-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

const baseData = ["Was war der höchste Messwert?", "Welcher ist der maximale Messwert?", "Was war das Maximum?", "Wie ist der maximale Wert?"];

writeYmlFileSlim({
  intent: "measurand_max",
  data: generateMeasurandMaxNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandMaxYML,
  threshold: 0.05,
});
