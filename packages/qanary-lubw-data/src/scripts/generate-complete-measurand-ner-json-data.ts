import { basePaths } from "./base-paths";
import generateNerJsonFileContent from "./generate-file-content/generate-ner-json-file-content";
import generateNerDomainBaseData from "./generate-training-data/generate-ner-domain-base-data";
import { generateNerTrainingData } from "./generate-training-data/generate-ner-training-data";
import { writeJsonFileTestAndTrain } from "./utils/write-json-file";

writeJsonFileTestAndTrain({
  data: generateNerTrainingData(),
  baseData: generateNerDomainBaseData(),
  generateNerJsonFileContent,
  trainPath: basePaths.trainJSON,
  testPath: basePaths.testJSON,
});
