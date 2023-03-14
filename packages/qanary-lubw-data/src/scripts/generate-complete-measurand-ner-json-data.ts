import { basePaths } from "./base-paths";
import generateNerJsonFileContent from "./generateFileContent/generateNerJsonFileContent";
import generateNerDomainBaseData from "./generateTrainingData/generateNerDomainBaseData";
import { generateNerTrainingData } from "./generateTrainingData/generateNerTrainingData";
import { writeJsonFileTestAndTrain } from "./utils/writeJsonFile";

writeJsonFileTestAndTrain({
  data: generateNerTrainingData(),
  baseData: generateNerDomainBaseData(),
  generateNerJsonFileContent,
  trainPath: basePaths.trainJSON,
  testPath: basePaths.testJSON,
});
