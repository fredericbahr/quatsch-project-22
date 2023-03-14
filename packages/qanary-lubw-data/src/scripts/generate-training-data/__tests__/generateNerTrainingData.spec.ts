<<<<<<<< HEAD:packages/qanary-lubw-data/src/scripts/generateTrainingData/__tests__/generate-ner-training-data.spec.ts
import { generateNerTrainingData } from "../generate-training-data/generate-ner-training-data";
========
import { generateNerTrainingData } from "../generateNerTrainingData";
>>>>>>>> origin/main:packages/qanary-lubw-data/src/scripts/generate-training-data/__tests__/generateNerTrainingData.spec.ts

describe("#Component generateNerTrainingData", () => {
  it("should return not empty ner training data array", async () => {
    const nerTrainingData = generateNerTrainingData();
    expect(nerTrainingData).not.toHaveLength(0);
  });
});
