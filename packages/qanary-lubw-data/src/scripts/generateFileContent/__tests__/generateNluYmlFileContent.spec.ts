import { NluTrainingData } from "../../types";
import generateNluYmlFileContent from "../generateNluYmlFileContent";

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
    const nerCsvFileContent = generateNluYmlFileContent(genNluTrainingData(), "test");
    expect(nerCsvFileContent).toStrictEqual(`# Automatically generated file. Do not change the content

version: "3.1"

nlu:
  - intent: test
    examples: |
      - Test data 1?
      - Test data 2 Ozon DEBW029?
      - Test data 3 pm25k Reutlingen Tabelle?
      - Test data 4 luqx Wiesloch Tabelle?`);
  });
});
