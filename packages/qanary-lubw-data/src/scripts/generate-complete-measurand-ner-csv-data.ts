import { basePaths } from "./base-paths";
import generateNerCsvFileContent from "./generateFileContent/generateNerCsvFileContent";
import generateNerDomainBaseData from "./generateTrainingData/generateNerDomainBaseData";
import { generateNerTrainingData } from "./generateTrainingData/generateNerTrainingData";
import { writeCsvFileTestAndTrain } from "./utils/writeCsvFile";

writeCsvFileTestAndTrain({
  data: generateNerTrainingData(),
  baseData: generateNerDomainBaseData(),
  generateNerCsvFileContent,
  trainPath: basePaths.trainCSV,
  testPath: basePaths.testCSV,
});
