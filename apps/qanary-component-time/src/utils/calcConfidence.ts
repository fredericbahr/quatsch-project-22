import { ParsedResult } from "chrono-node";
import { Component } from "chrono-node/src";

/**
 * Possible keys in the ParesedResult object. For time spans the start and end value is set, for time values only the
 * start value is set.
 */
enum ParsedResultKey {
  START = "start",
  END = "end",
}

/**
 * The weight of a requested time information in the text fragment
 */
enum TimeInformationWeight {
  NOT_FOUND,
  FOUND,
}

/**
 * The time information that a corresponding text fragment should contain to get a meaningful date
 */
const requestedTimeInformationInTextFragment: Array<Component> = ["year", "month", "day"];

/**
 * The sum of the time information that results in a meaningful date
 * @see requestedTimeInformationInTextFragment
 * @param parsedResult a found time span or a time value within the question
 * @param parsedResultKey a keys in the ParesedResult object
 * @returns a value of 0 to 3 (possible findings of requestedTimeInformationInTextFragment)
 */
const summarizeCertainFounds = (parsedResult: ParsedResult, parsedResultKey: ParsedResultKey): number => {
  return requestedTimeInformationInTextFragment
    .map((component: Component) => parsedResult[parsedResultKey]?.isCertain(component) || false)
    .reduce((accumulator: number, currentValue: boolean) => {
      return accumulator + (currentValue ? TimeInformationWeight.FOUND : TimeInformationWeight.NOT_FOUND);
    }, TimeInformationWeight.NOT_FOUND);
};

/**
 * Calculates a confidence depending on whether a time span or a time value was found and considering the importance of
 * the values to be found in the text fragment
 * @param parsedResult a found time span or a time value within the question
 */
export const calcConfidence = (parsedResult: ParsedResult): number => {
  /**
   * The weight of found time values
   */
  const weightOfFounds = Object.values(ParsedResultKey)
    .map((parsedResultKey) => summarizeCertainFounds(parsedResult, parsedResultKey))
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  /**
   * This is a filtered list of the start and end properties of the ParsedResult object, depending on whether they
   * exist in the object or not. In case of time values there is only one start object, the value of the end object is
   * null. In case of time spans, there is a valid ParsedComponents object for both start and end properties.
   */
  const parsedResultKeysWithParsedComponentValues = Object.values(ParsedResultKey).filter(
    (parsedResultKey) => !!parsedResult[parsedResultKey],
  );

  /**
   * The total weight, depending on whether there is an end or not
   */
  const totalWeights = requestedTimeInformationInTextFragment.length * parsedResultKeysWithParsedComponentValues.length;

  return weightOfFounds / totalWeights;
};
