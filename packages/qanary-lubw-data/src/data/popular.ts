import { IPopularIntents } from "../interfaces/popular";
import { IStation } from "../interfaces/station";

/**
 * Popular stations that are recommended on failure
 */
export const popularStations: IStation[] = [
  {
    id: "DEBW081",
    label: "Karlsruhe-Nordwest",
    lat: 49.028594444062975,
    long: 8.355647222201029,
  },
  {
    id: "DEBW080",
    label: "Karlsruhe Reinhold-Frank-Straße",
    lat: 49.00795833322737,
    long: 8.387188888920678,
  },
  {
    id: "DEBW125",
    label: "Pfinztal Karlsruher Straße",
    lat: 49.00371111101575,
    long: 8.526283333036636,
  },
];

/**
 * Popular intents that are recommended if no intent is found
 */
export const popularIntents: Array<IPopularIntents> = [
  {
    title: "Messwert",
    payload: "/action_measurand_complete",
  },
  {
    title: "Grenzwert",
    payload: "/action_measurand_threshold",
  },
  {
    title: "Maximum",
    payload: "/action_measurand_max",
  },
];
