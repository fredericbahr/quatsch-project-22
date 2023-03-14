import { generateMeasurandMaxNluTrainingData } from "../generateMeasurandMaxNluTrainingData";

describe("#Component generateMeasurandMaxNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandMaxNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
