import { generateMeasurandThresholdNluTrainingData } from "../generateMeasurandThresholdNluTrainingData";

describe("#Component generateMeasruandThresholdNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandThresholdNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
