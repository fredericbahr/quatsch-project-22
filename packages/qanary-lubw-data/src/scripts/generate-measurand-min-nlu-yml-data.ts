import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateMeasurandMinNluTrainingData } from "./generateTrainingData/generateMeasurandMinNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

const baseData = ["Was war der niedrigste Messwert?", "Welcher ist der minimale Messwert?", "Was war das Minimum?"];

writeYmlFileSlim({
  intent: "measurand_min",
  data: generateMeasurandMinNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandMinYML,
  threshold: 0.05,
});
