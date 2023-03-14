import { generateNerTrainingData } from "../generate-ner-training-data";

describe("#Component generateNerTrainingData", () => {
  it("should return not empty ner training data array", async () => {
    const nerTrainingData = generateNerTrainingData();
    expect(nerTrainingData).not.toHaveLength(0);
  });
});
