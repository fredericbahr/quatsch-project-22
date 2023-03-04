import generateNluYmlFileContent from "../generateFileContent/generateNluYmlFileContent";
import { NluTrainingData } from "../types";

describe("#Component generateNluYmlFileContent", () => {
  const genNluTrainingData = (): Array<NluTrainingData> => {
    return [
      "Test data 1?",
      "Test data 2 Ozon DEBW029?",
      "Test data 3 pm25k Reutlingen Tabelle?",
      "Test data 4 luqx Wiesloch Tabelle?",
    ];
  };

  it("should return csv file content string", async () => {
    const nerCsvFileContent = generateNluYmlFileContent(genNluTrainingData());
    expect(nerCsvFileContent).toStrictEqual(`version: "3.1"

nlu:
  ## Creation of context
  - intent: context_air_measurand
    examples: |
      - Test data 1?
      - Test data 2 Ozon DEBW029?
      - Test data 3 pm25k Reutlingen Tabelle?
      - Test data 4 luqx Wiesloch Tabelle?`);
  });
});
