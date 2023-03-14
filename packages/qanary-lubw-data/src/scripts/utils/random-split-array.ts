/**
 * Randomly splits input array into two approximately same sized halves.
 * @param data training data array
 * @returns randomly generated array halves
 */
const randomSplitArray = <T>(data: Array<T>): [Array<T>, Array<T>] => {
  const data1: Array<T> = [];
  const data2: Array<T> = [];

  data.forEach((d) => {
    if (Math.random() < 0.5) {
      data1.push(d);
    } else {
      data2.push(d);
    }
  });

  return [data1, data2];
};

export default randomSplitArray;
