import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateMeasurandThresholdNluTrainingData } from "./generate-training-data/generate-measurand-threshold-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

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
