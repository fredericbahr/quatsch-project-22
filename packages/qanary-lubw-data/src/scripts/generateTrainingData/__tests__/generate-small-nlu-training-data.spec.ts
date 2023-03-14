<<<<<<<< HEAD:packages/qanary-lubw-data/src/scripts/generateTrainingData/__tests__/generate-small-nlu-training-data.spec.ts
import { generateSmallNluTrainingData } from "../generate-training-data/generate-small-nlu-training-data";
========
import { generateSmallNluTrainingData } from "../generateSmallNluTrainingData";
>>>>>>>> origin/main:packages/qanary-lubw-data/src/scripts/generate-training-data/__tests__/generateSmallNluTrainingData.spec.ts

describe("#Component generateSmallNluTrainingData", () => {
  it("should return not empty nlu training data array", async () => {
    const nluTrainingData = generateSmallNluTrainingData();
    expect(nluTrainingData).not.toHaveLength(0);
  });
});
