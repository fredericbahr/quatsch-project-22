import { generateNluTrainingData } from "../generate-nlu-training-data";

describe("#Component generateNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
