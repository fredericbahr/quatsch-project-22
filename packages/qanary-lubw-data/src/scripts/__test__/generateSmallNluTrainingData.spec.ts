import { generateSmallNluTrainingData } from "../generateTrainingData/generateSmallNluTrainingData";

describe("#Component generateSmallNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateSmallNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
