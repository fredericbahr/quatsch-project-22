import generateNerJsonFileContent from "../generateFileContent/generateNerJsonFileContent";
import { NerTrainingData } from "../types";

describe("#Component generateNerJsonFileContent", () => {
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

  it("should return json file content string with 'trainingdata' as key", async () => {
    const nerCsvFileContent = generateNerJsonFileContent(genNerTrainingData(), "trainingdata");
    expect(nerCsvFileContent).toStrictEqual(`{
  "trainingdata": [
    {
      "text": "Test data 1?",
      "language": "de",
      "entities": {}
    },
    {
      "text": "Test data 2 Ozon DEBW029?",
      "language": "de",
      "entities": {
        "station": "DEBW029",
        "measurand": "Ozon"
      }
    },
    {
      "text": "Test data 3 pm25k Reutlingen Tabelle?",
      "language": "de",
      "entities": {
        "station": "Reutlingen",
        "measurand": "pm25k",
        "representation": "Tabelle"
      }
    },
    {
      "text": "Test data 4 luqx Wiesloch Tabelle?",
      "language": "de",
      "entities": {
        "station": "Wiesloch",
        "measurand": "luqx",
        "representation": "Graph",
        "calculation": "Durchschnitt"
      }
    }
  ]
}`);
  });

  it("should return json file content string with 'testingdata' as key", async () => {
    const nerCsvFileContent = generateNerJsonFileContent(genNerTrainingData(), "testingdata");
    expect(nerCsvFileContent).toStrictEqual(`{
  "testingdata": [
    {
      "text": "Test data 1?",
      "language": "de",
      "entities": {}
    },
    {
      "text": "Test data 2 Ozon DEBW029?",
      "language": "de",
      "entities": {
        "station": "DEBW029",
        "measurand": "Ozon"
      }
    },
    {
      "text": "Test data 3 pm25k Reutlingen Tabelle?",
      "language": "de",
      "entities": {
        "station": "Reutlingen",
        "measurand": "pm25k",
        "representation": "Tabelle"
      }
    },
    {
      "text": "Test data 4 luqx Wiesloch Tabelle?",
      "language": "de",
      "entities": {
        "station": "Wiesloch",
        "measurand": "luqx",
        "representation": "Graph",
        "calculation": "Durchschnitt"
      }
    }
  ]
}`);
  });
});
