import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generateFileContent/generateNluYmlFileContent";
import { generateMeasurandThresholdNluTrainingData } from "./generateTrainingData/generateMeasurandThresholdNluTrainingData";
import { writeYmlFileSlim } from "./utils/writeYmlFile";

const baseData = [
  "Ist der Messwert extrem?",
  "Ist der Messwert gefährlich?",
  "Ist der Messwert grenzwertig?",
  "Liegt der Messwert über einem Grenzwert?",
];

writeYmlFileSlim({
  intent: "measurand_threshold",
  data: generateMeasurandThresholdNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandThresholdYML,
  threshold: 0.008,
});
