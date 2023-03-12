import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateMeasurandMaxNluTrainingData } from "./generateTrainingData/generateMeasurandMaxNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

const baseData = ["Was war der höchste Messwert?", "Welcher ist der maximale Messwert?", "Was war das Maximum?"];

writeYmlFileSlim({
  intent: "measurand_max",
  data: generateMeasurandMaxNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandMaxYML,
  threshold: 0.05,
});
