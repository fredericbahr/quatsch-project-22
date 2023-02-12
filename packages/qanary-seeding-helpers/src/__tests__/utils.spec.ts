import { isEmptyArray } from "../utils";

describe("utils", () => {
  describe("isEmptyArray", () => {
    it("should return true if the array is empty", () => {
      const arr: number[] = [];
      const result = isEmptyArray(arr);
      expect(result).toBe(true);
    });

    it("should return false if the array is not empty", () => {
      const arr: number[] = [1, 2, 3];
      const result = isEmptyArray(arr);
      expect(result).toBe(false);
    });
  });
});
