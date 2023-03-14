import { generateNluTrainingData } from "../generateNluTrainingData";

describe("#Component generateNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
