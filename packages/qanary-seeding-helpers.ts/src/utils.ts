/**
 * Checks whether the given array is empty or not
 * @param array the array to check
 * @returns true if the array is empty, false otherwise
 */
export const isEmptyArray = <T>(array: T[]): boolean => {
  return array.length === 0;
};
