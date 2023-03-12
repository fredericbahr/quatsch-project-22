import { CALCULATION_TYPE } from "shared";

/**
 * Summarizes two numbers
 * @param a operand a
 * @param b operand b
 */
const sum = (a: number, b: number): number => a + b;

/**
 * Calculates the average from a list of values
 * @param numberArray a list of numbers
 */
const average = (numberArray: Array<number>): number => numberArray.reduce(sum) / numberArray.length;

/**
 * A service for calculating LUPO cloud data values (list of numbers)
 */
export class CalculationService {
  /**
   * A factory returning the adequate calculation method
   * @param type the identifier of calculation methods
   */
  public static getCalculationCallback(type: CALCULATION_TYPE) {
    switch (type) {
      case CALCULATION_TYPE.Average:
        return (numberArray: Array<number>) => average(numberArray);
      case CALCULATION_TYPE.Maximum:
        return (numberArray: Array<number>) => Math.max(...numberArray);
      case CALCULATION_TYPE.Minimum:
        return (numberArray: Array<number>) => Math.min(...numberArray);
      default:
        return (numberArray: Array<number>) => numberArray[0];
    }
  }
}
