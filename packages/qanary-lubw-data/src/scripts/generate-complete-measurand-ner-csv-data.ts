import { basePaths } from "./base-paths";
import generateNerCsvFileContent from "./generate-file-content/generate-ner-csv-file-content";
import generateNerDomainBaseData from "./generate-training-data/generate-ner-domain-base-data";
import { generateNerTrainingData } from "./generate-training-data/generate-ner-training-data";
import { writeCsvFileTestAndTrain } from "./utils/write-csv-file";

writeCsvFileTestAndTrain({
  data: generateNerTrainingData(),
  baseData: generateNerDomainBaseData(),
  generateNerCsvFileContent,
  trainPath: basePaths.trainCSV,
  testPath: basePaths.testCSV,
});
