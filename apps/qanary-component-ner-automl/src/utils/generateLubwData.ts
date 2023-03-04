import { calculations, measurands, representations, stations } from "qanary-lubw-data";

type Key = "id" | "label";

const additionalCalculationEntries: Array<string> = [
  "Minima",
  "minimal",
  "Maxima",
  "maximal",
  "durchschnittlich",
  "kritisch",
];

/**
 * Generates an array of labels and/or ids of provided lubw domain data.
 * @param data lubw domain data
 * @param keys keys to include in result array
 * @returns generated domain data array
 */
const generateDomainData = <T extends { id: string; label: string }>(
  data: Array<T>,
  keys: Array<Key>,
): Array<string> => {
  const entryData: Array<string> = [];

  data.forEach((entry) => {
    keys.forEach((key) => {
      entryData.push(entry[key]);
    });
  });

  return entryData;
};

/**
 * Generates domain data for lubw stations.
 * @returns station data containing labels and ids
 */
const generateStations = (): Array<string> => generateDomainData(stations, ["id", "label"]);

/**
 * Generates domain data for lubw measurands.
 * @returns measurand data containing labels and ids
 */
const generateMeasurands = (): Array<string> => generateDomainData(measurands, ["id", "label"]);

/**
 * Generates domain data for lubw calculations.
 * @returns calculation data containing labels
 */
const generateCalculations = (): Array<string> => generateDomainData(calculations, ["label"]);

/**
 * Generates domain data for lubw representations.
 * @returns representation data containing labels
 */
const generateRepresentations = (): Array<string> => generateDomainData(representations, ["label"]);

/**
 * Generates domain data for lubw stations, measurands, calculations and representations.
 * @returns object containing all lubw domain data
 */
const generateLubwData = (): {
  stations: Array<string>;
  measurands: Array<string>;
  calculations: Array<string>;
  representations: Array<string>;
} => {
  return {
    stations: generateStations(),
    measurands: generateMeasurands(),
    calculations: [...generateCalculations(), ...additionalCalculationEntries],
    representations: generateRepresentations(),
  };
};

export default generateLubwData;
