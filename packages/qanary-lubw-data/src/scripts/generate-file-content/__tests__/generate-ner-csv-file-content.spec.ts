import { NerTrainingData } from "../../types";
import generateNerCsvFileContent from "../generate-ner-csv-file-content";

describe("#Component generateNerCsvFileContent", () => {
  const genNerTrainingData = (): Array<NerTrainingData> => {
    return [
      {
        text: "Test data 1?",
        language: "de",
        entities: {},
      },
      {
        text: "Test data 2 Ozon DEBW029?",
        language: "de",
        entities: {
          station: "DEBW029",
          measurand: "Ozon",
        },
      },
      {
        text: "Test data 3 pm25k Reutlingen Tabelle?",
        language: "de",
        entities: {
          station: "Reutlingen",
          measurand: "pm25k",
          representation: "Tabelle",
        },
      },
      {
        text: "Test data 4 luqx Wiesloch Tabelle?",
        language: "de",
        entities: {
          station: "Wiesloch",
          measurand: "luqx",
          representation: "Graph",
          calculation: "Durchschnitt",
        },
      },
    ];
  };

  it("should return csv file content string", async () => {
    const nerCsvFileContent = generateNerCsvFileContent(genNerTrainingData());
    expect(nerCsvFileContent).toStrictEqual(`text,station,measurand,calculation,representation
"Test data 1?",,,,
"Test data 2 Ozon DEBW029?",DEBW029,Ozon,,
"Test data 3 pm25k Reutlingen Tabelle?",Reutlingen,pm25k,,Tabelle
"Test data 4 luqx Wiesloch Tabelle?",Wiesloch,luqx,Durchschnitt,Graph`);
  });
});
