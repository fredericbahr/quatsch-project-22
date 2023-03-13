import { basePaths } from "./base-paths";
import generateNluYmlFileContent from "./generate-file-content/generate-nlu-yml-file-content";
import { generateMeasurandSeasonNluTrainingData } from "./generate-training-data/generate-measurand-season-nlu-training-data";
import { writeYmlFileSlim } from "./utils/write-yml-file";

const baseData = ["Ist dieser Wert typisch für die aktuelle Jahreszeit?", "Ist dies typisch für die aktuelle Jahreszeit?",];

writeYmlFileSlim({
  intent: "measurand_season",
  data: generateMeasurandSeasonNluTrainingData(),
  baseData,
  generateNluYmlFileContent,
  path: basePaths.measurandSeasonYML,
  threshold: 0.012,
});
