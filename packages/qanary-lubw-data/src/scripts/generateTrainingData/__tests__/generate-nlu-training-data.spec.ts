<<<<<<<< HEAD:packages/qanary-lubw-data/src/scripts/generateTrainingData/__tests__/generate-nlu-training-data.spec.ts
import { generateNluTrainingData } from "../generate-training-data/generate-nlu-training-data";
========
import { generateNluTrainingData } from "../generateNluTrainingData";
>>>>>>>> origin/main:packages/qanary-lubw-data/src/scripts/generate-training-data/__tests__/generateNluTrainingData.spec.ts

describe("#Component generateNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
