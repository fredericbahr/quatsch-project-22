import { generateMeasurandMinNluTrainingData } from "../generateMeasurandMinNluTrainingData";

describe("#Component generateMeasurandMinNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateMeasurandMinNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
