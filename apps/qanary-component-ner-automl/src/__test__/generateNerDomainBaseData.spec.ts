import generateNerDomainBaseData from "../generateTrainingData/generateNerDomainBaseData";

describe("#Component generateNerDomainBaseData", () => {
  it("should return not empty ner training data array", async () => {
    const nerTrainingData = generateNerDomainBaseData();
    const DOMAIN_BASE_DATA_LENGTH = 106;
    const FIRST_ELEMENT_INDEX = 0;
    const LAST_ELEMENT_INDEX = nerTrainingData.length - 1;

    expect(nerTrainingData).toHaveLength(DOMAIN_BASE_DATA_LENGTH);
    expect(nerTrainingData[FIRST_ELEMENT_INDEX]).toStrictEqual({
      text: "DEBW029",
      language: "de",
      entities: {
        station: "DEBW029",
      },
    });
    expect(nerTrainingData[LAST_ELEMENT_INDEX]).toStrictEqual({
      text: "Graph",
      language: "de",
      entities: {
        representation: "Graph",
      },
    });
  });
});
