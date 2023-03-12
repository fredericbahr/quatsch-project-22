import { generateNerTrainingData } from "../generateTrainingData/generateNerTrainingData";

describe("#Component generateNerTrainingData", () => {
  it("should return not empty ner training data array", async () => {
    const nerTrainingData = generateNerTrainingData();
    expect(nerTrainingData).not.toHaveLength(0);
  });
});
