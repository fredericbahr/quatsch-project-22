import { NerTrainingData, NluTrainingData, TrainingQuestion } from "../../types";
import generateLubwData from "../../utils/generateLubwData";
import {
  generateStationMeasurandCalculationData,
  generateStationMeasurandData,
  generateStationMeasurandRepresentationCalculationData,
  generateStationMeasurandRepresentationData,
} from "../generateTrainingData";

const { stations, measurands, calculations, representations } = generateLubwData();
const FIRST_ENTRY = 0;

describe("#Component generateTrainingData", () => {
  const genMockStationMeasurandQuestions = (addAllowLists = true): Array<TrainingQuestion> => {
    return [
      {
        text: ({ measurand, station }) => `Test question 1 ${measurand} ${station}?`,
        measurandAllowList: addAllowLists ? ["Ozon"] : undefined,
      },
      {
        text: ({ measurand, station }) => `Test question 2 ${measurand} ${station}?`,
        measurandAllowList: addAllowLists ? ["luqx"] : undefined,
      },
    ];
  };

  const genMockStationMeasurandCalculationQuestions = (addAllowLists = true): Array<TrainingQuestion> => {
    return [
      {
        text: ({ measurand, station, calculation }) => `Test question 1 ${measurand} ${station} ${calculation}?`,
        measurandAllowList: addAllowLists ? ["Ozon"] : undefined,
        calculationAllowList: addAllowLists ? ["maximal"] : undefined,
      },
      {
        text: ({ measurand, station, calculation }) => `Test question 2 ${measurand} ${station} ${calculation}?`,
        measurandAllowList: addAllowLists ? ["luqx"] : undefined,
        calculationAllowList: addAllowLists ? ["Durchschnitt"] : undefined,
      },
    ];
  };

  const genMockStationMeasurandRepresentationQuestions = (addAllowLists = true): Array<TrainingQuestion> => {
    return [
      {
        text: ({ measurand, station, representation }) => `Test question 1 ${measurand} ${station} ${representation}?`,
        measurandAllowList: addAllowLists ? ["Ozon"] : undefined,
        representationAllowList: addAllowLists ? ["Tabelle"] : undefined,
      },
      {
        text: ({ measurand, station, representation }) => `Test question 2 ${measurand} ${station} ${representation}?`,
        measurandAllowList: addAllowLists ? ["luqx"] : undefined,
        representationAllowList: addAllowLists ? ["Graph"] : undefined,
      },
    ];
  };

  const genMockStationMeasurandRepresentationCalculationQuestions = (addAllowLists = true): Array<TrainingQuestion> => {
    return [
      {
        text: ({ measurand, station, representation, calculation }) =>
          `Test question 1 ${measurand} ${station} ${representation} ${calculation}?`,
        measurandAllowList: addAllowLists ? ["Ozon"] : undefined,
        representationAllowList: addAllowLists ? ["Tabelle"] : undefined,
        calculationAllowList: addAllowLists ? ["maximal"] : undefined,
      },
      {
        text: ({ measurand, station, representation, calculation }) =>
          `Test question 2 ${measurand} ${station} ${representation} ${calculation}?`,
        measurandAllowList: addAllowLists ? ["luqx"] : undefined,
        representationAllowList: addAllowLists ? ["Graph"] : undefined,
        calculationAllowList: addAllowLists ? ["Durchschnitt"] : undefined,
      },
    ];
  };

  it("should return a ner training data array for questions with station and measurand", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandQuestions();

    generateStationMeasurandData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * mockQuestions.length);

    const nerDataStations = nerData.map((entry) => entry.entities.station);
    expect(nerDataStations).toStrictEqual([...stations, ...stations]);

    expect(nerData[FIRST_ENTRY]).toStrictEqual({
      text: `Test question 1 Ozon ${stations[FIRST_ENTRY]}?`,
      language: "de",
      entities: {
        station: stations[FIRST_ENTRY],
        measurand: "Ozon",
        calculation: undefined,
        representation: undefined,
      },
    });

    const nerDataLastEntry = nerData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nerData[nerDataLastEntry]).toStrictEqual({
      text: `Test question 2 luqx ${stations[stationsLastEntry]}?`,
      language: "de",
      entities: {
        station: stations[stationsLastEntry],
        measurand: "luqx",
        calculation: undefined,
        representation: undefined,
      },
    });
  });

  it("should use full measurand list if no allowList provided", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandQuestions(false);

    generateStationMeasurandData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * measurands.length * mockQuestions.length);
  });

  it("should return a ner training data array for questions with station, measurand and calculation", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandCalculationQuestions();

    generateStationMeasurandCalculationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * mockQuestions.length);

    const nerDataStations = nerData.map((entry) => entry.entities.station);
    expect(nerDataStations).toStrictEqual([...stations, ...stations]);

    expect(nerData[FIRST_ENTRY]).toStrictEqual({
      text: `Test question 1 Ozon ${stations[FIRST_ENTRY]} maximal?`,
      language: "de",
      entities: {
        station: stations[FIRST_ENTRY],
        measurand: "Ozon",
        calculation: "maximal",
        representation: undefined,
      },
    });

    const nerDataLastEntry = nerData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nerData[nerDataLastEntry]).toStrictEqual({
      text: `Test question 2 luqx ${stations[stationsLastEntry]} Durchschnitt?`,
      language: "de",
      entities: {
        station: stations[stationsLastEntry],
        measurand: "luqx",
        calculation: "Durchschnitt",
        representation: undefined,
      },
    });
  });

  it("should use full measurand and calculation lists if no allowLists provided", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandCalculationQuestions(false);

    generateStationMeasurandCalculationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * measurands.length * calculations.length * mockQuestions.length);
  });

  it("should return a ner training data array for questions with station, measurand and representation", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationQuestions();

    generateStationMeasurandRepresentationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * mockQuestions.length);

    const nerDataStations = nerData.map((entry) => entry.entities.station);
    expect(nerDataStations).toStrictEqual([...stations, ...stations]);

    expect(nerData[FIRST_ENTRY]).toStrictEqual({
      text: `Test question 1 Ozon ${stations[FIRST_ENTRY]} Tabelle?`,
      language: "de",
      entities: {
        station: stations[FIRST_ENTRY],
        measurand: "Ozon",
        calculation: undefined,
        representation: "Tabelle",
      },
    });

    const nerDataLastEntry = nerData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nerData[nerDataLastEntry]).toStrictEqual({
      text: `Test question 2 luqx ${stations[stationsLastEntry]} Graph?`,
      language: "de",
      entities: {
        station: stations[stationsLastEntry],
        measurand: "luqx",
        calculation: undefined,
        representation: "Graph",
      },
    });
  });

  it("should use full measurand and representation lists if no allowLists provided", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationQuestions(false);

    generateStationMeasurandRepresentationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * measurands.length * representations.length * mockQuestions.length);
  });

  it("should return a ner training data array for questions with station, measurand, representation and calculation", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationCalculationQuestions();

    generateStationMeasurandRepresentationCalculationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(stations.length * mockQuestions.length);

    const nerDataStations = nerData.map((entry) => entry.entities.station);
    expect(nerDataStations).toStrictEqual([...stations, ...stations]);

    expect(nerData[FIRST_ENTRY]).toStrictEqual({
      text: `Test question 1 Ozon ${stations[FIRST_ENTRY]} Tabelle maximal?`,
      language: "de",
      entities: {
        station: stations[FIRST_ENTRY],
        measurand: "Ozon",
        calculation: "maximal",
        representation: "Tabelle",
      },
    });

    const nerDataLastEntry = nerData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nerData[nerDataLastEntry]).toStrictEqual({
      text: `Test question 2 luqx ${stations[stationsLastEntry]} Graph Durchschnitt?`,
      language: "de",
      entities: {
        station: stations[stationsLastEntry],
        measurand: "luqx",
        calculation: "Durchschnitt",
        representation: "Graph",
      },
    });
  });

  it("should use full measurand, representation and calculation lists if no allowLists provided", async () => {
    const nerData: Array<NerTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationCalculationQuestions(false);

    generateStationMeasurandRepresentationCalculationData("ner", mockQuestions, nerData);

    expect(nerData).toHaveLength(
      stations.length * measurands.length * representations.length * calculations.length * mockQuestions.length,
    );
  });

  it("should return a nlu training data array for questions with station and measurand", async () => {
    const nluData: Array<NluTrainingData> = [];
    const mockQuestions = genMockStationMeasurandQuestions();

    generateStationMeasurandData("nlu", mockQuestions, nluData);

    expect(nluData).toHaveLength(stations.length * mockQuestions.length);

    expect(nluData[FIRST_ENTRY]).toStrictEqual(`Test question 1 Ozon ${stations[FIRST_ENTRY]}?`);

    const nluDataLastEntry = nluData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nluData[nluDataLastEntry]).toStrictEqual(`Test question 2 luqx ${stations[stationsLastEntry]}?`);
  });

  it("should return a nlu training data array for questions with station, measurand and calculation", async () => {
    const nluData: Array<NluTrainingData> = [];
    const mockQuestions = genMockStationMeasurandCalculationQuestions();

    generateStationMeasurandCalculationData("nlu", mockQuestions, nluData);

    expect(nluData).toHaveLength(stations.length * mockQuestions.length);

    expect(nluData[FIRST_ENTRY]).toStrictEqual(`Test question 1 Ozon ${stations[FIRST_ENTRY]} maximal?`);

    const nluDataLastEntry = nluData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nluData[nluDataLastEntry]).toStrictEqual(
      `Test question 2 luqx ${stations[stationsLastEntry]} Durchschnitt?`,
    );
  });

  it("should return a nlu training data array for questions with station, measurand and representation", async () => {
    const nluData: Array<NluTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationQuestions();

    generateStationMeasurandRepresentationData("nlu", mockQuestions, nluData);

    expect(nluData).toHaveLength(stations.length * mockQuestions.length);

    expect(nluData[FIRST_ENTRY]).toStrictEqual(`Test question 1 Ozon ${stations[FIRST_ENTRY]} Tabelle?`);

    const nluDataLastEntry = nluData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nluData[nluDataLastEntry]).toStrictEqual(`Test question 2 luqx ${stations[stationsLastEntry]} Graph?`);
  });

  it("should return a nlu training data array for questions with station, measurand, representation and calculation", async () => {
    const nluData: Array<NluTrainingData> = [];
    const mockQuestions = genMockStationMeasurandRepresentationCalculationQuestions();

    generateStationMeasurandRepresentationCalculationData("nlu", mockQuestions, nluData);

    expect(nluData).toHaveLength(stations.length * mockQuestions.length);

    expect(nluData[FIRST_ENTRY]).toStrictEqual(`Test question 1 Ozon ${stations[FIRST_ENTRY]} Tabelle maximal?`);

    const nluDataLastEntry = nluData.length - 1;
    const stationsLastEntry = stations.length - 1;
    expect(nluData[nluDataLastEntry]).toStrictEqual(
      `Test question 2 luqx ${stations[stationsLastEntry]} Graph Durchschnitt?`,
    );
  });
});
