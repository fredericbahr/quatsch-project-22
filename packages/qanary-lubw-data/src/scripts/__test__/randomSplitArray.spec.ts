import randomSplitArray from "../utils/randomSplitArray";

describe("#Component randomSplitArray", () => {
  const genMockArray = () => {
    return ["str1", "str2", "str3", "str4"];
  };

  it("should return two arrays with same combined length as original array", async () => {
    const mockArray = genMockArray();
    const [array1, array2] = randomSplitArray<string>(mockArray);
    expect(array1.length + array2.length).toStrictEqual(mockArray.length);
  });

  it("should return two arrays that together contain all elements of the original array", async () => {
    const mockArray = genMockArray();
    const [array1, array2] = randomSplitArray<string>(mockArray);
    const combinedArrays = [...array1, ...array2];
    expect(combinedArrays).toContain(mockArray[0]);
    expect(combinedArrays).toContain(mockArray[1]);
    expect(combinedArrays).toContain(mockArray[2]);
    expect(combinedArrays).toContain(mockArray[3]);
  });
});
