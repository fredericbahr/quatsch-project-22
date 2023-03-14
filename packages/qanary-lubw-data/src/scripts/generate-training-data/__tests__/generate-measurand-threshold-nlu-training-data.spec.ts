import { generateMeasurandThresholdNluTrainingData } from "../generate-measurand-threshold-nlu-training-data";

describe("#Component generateMeasruandThresholdNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandThresholdNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
