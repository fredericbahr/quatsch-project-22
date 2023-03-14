import { generateMeasurandMinNluTrainingData } from "../generate-measurand-min-nlu-training-data";

describe("#Component generateMeasurandMinNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandMinNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
