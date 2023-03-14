import { generateMeasurandMaxNluTrainingData } from "../generate-measurand-max-nlu-training-data";

describe("#Component generateMeasurandMaxNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandMaxNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
