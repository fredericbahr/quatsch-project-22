import generateTrainingDataEntry from "../generateTrainingData/generateTrainingDataEntry";
import { DomainTemplate, TrainingQuestion } from "../types";

describe("#Component generateTrainingDataEntry", () => {
  const genMockQuestion = (): TrainingQuestion => {
    return {
      text: ({ measurand, station, representation, calculation }) =>
        `Test question ${calculation} ${measurand} ${station} ${representation}.`,
      measurandPrefix: "mp-",
      measurandSuffix: "-ms",
      representationPrefix: "rp-",
      representationSuffix: "-rs",
      calculationPrefix: "cp-",
      calculationSuffix: "-cs",
    };
  };

  const genMockDomainTemplates = (): DomainTemplate => {
    return {
      station: "station",
      measurand: "measurand",
      representation: "representation",
      calculation: "calculation",
    };
  };

  it("should return a ner training data object", async () => {
    const generatedTrainingDataEntry = generateTrainingDataEntry(genMockQuestion(), genMockDomainTemplates(), "ner");
    expect(generatedTrainingDataEntry).toStrictEqual({
      text: "Test question cp-calculation-cs mp-measurand-ms station rp-representation-rs.",
      language: "de",
      entities: {
        station: "station",
        measurand: "mp-measurand-ms",
        representation: "rp-representation-rs",
        calculation: "cp-calculation-cs",
      },
    });
  });

  it("should return a nlu training data object", async () => {
    const generatedTrainingDataEntry = generateTrainingDataEntry(genMockQuestion(), genMockDomainTemplates(), "nlu");
    expect(generatedTrainingDataEntry).toStrictEqual(
      "Test question cp-calculation-cs mp-measurand-ms station rp-representation-rs.",
    );
  });
});
