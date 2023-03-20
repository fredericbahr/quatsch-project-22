import { TrainingQuestion } from "../types";

export const questionsCalculation: Array<TrainingQuestion> = [
  {
    text: ({ calculation }) => `Was war der ${calculation} Messwert?`,
    calculationAllowList: ["höchste", "niedrigste"],
  },
  {
    text: ({ calculation }) => `Was war der ${calculation} Messwert?`,
    calculationAllowList: ["minimal", "maximal"],
    calculationSuffix: "e",
  },
  {
    text: ({ calculation }) => `Welcher ist der ${calculation} Messwert?`,
    calculationAllowList: ["höchste", "niedrigste"],
  },
  {
    text: ({ calculation }) => `Welcher ist der ${calculation} Messwert?`,
    calculationAllowList: ["minimal", "maximal"],
    calculationSuffix: "e",
  },
  {
    text: ({ calculation }) => `Was war das ${calculation}?`,
    calculationAllowList: ["Minimum", "Maximum"],
  },
  {
    text: ({ calculation }) => `Ist der Messwert ${calculation}?`,
    calculationAllowList: ["extrem", "gefährlich", "grenzwertig"],
  },
  {
    text: ({ calculation }) => `Liegt der Messwert über einem ${calculation}?`,
    calculationAllowList: ["Grenzwert"],
  },
];

export const questionsStationMeasurand: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station }) => `Wie ist der ${measurand} in ${station}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
  },
  {
    text: ({ measurand, station }) => `Wie ist der ${measurand} Wert in ${station}?`,
    measurandAllowList: ["luqx", "no2", "o3", "pm10", "pm25k"],
  },
  {
    text: ({ measurand, station }) => `Wie ist der Wert des ${measurand} in ${station}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    measurandSuffix: "s",
  },
  {
    text: ({ measurand, station }) => `Wie ist der ${measurand} in ${station}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    measurandSuffix: "wert",
  },
];

export const questionsStationMeasurandRepresentation: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station, representation }) =>
      `Zeig mir eine ${representation} der ${measurand} Werte der letzten Woche aus ${station}.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Tabelle", "Liste"],
  },
  {
    text: ({ measurand, station, representation }) =>
      `Zeig mir eine ${representation} der ${measurand} der letzten Woche aus ${station}.`,
    measurandAllowList: ["Luftqualitätsindex", "Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    representationAllowList: ["Tabelle", "Liste"],
    measurandSuffix: "werte",
  },
  {
    text: ({ measurand, station, representation }) =>
      `Zeig mir einen ${representation} der ${measurand} Werte der letzten Woche aus ${station}.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Graph"],
    representationSuffix: "en",
  },
  {
    text: ({ measurand, station, representation }) =>
      `Zeig mir einen ${representation} der ${measurand} der letzten Woche aus ${station}.`,
    measurandAllowList: ["Luftqualitätsindex", "Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    representationAllowList: ["Graph"],
    representationSuffix: "en",
    measurandSuffix: "werte",
  },
  {
    text: ({ measurand, station, representation }) =>
      `Welcher ${measurand} Wert wird gerade in ${station} gemessen? Repräsentiert als ${representation}.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Text"],
  },
];

export const questionsStationMeasurandCalculation: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war der ${measurand} in ${station} gestern im ${calculation}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
    measurandSuffix: "wert",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war der ${measurand} in ${station} gestern im ${calculation}?`,
    measurandAllowList: ["Luftqualitätsindex", "luqx", "no2", "o3", "pm10", "pm25k"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war der ${measurand} Wert in ${station} gestern im ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war gestern der ${calculation} ${measurand} in ${station}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    calculationAllowList: ["minimal", "maximal", "durchschnittlich"],
    measurandSuffix: "wert",
    calculationSuffix: "e",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war gestern der ${calculation} ${measurand} in ${station}?`,
    measurandAllowList: ["Luftqualitätsindex", "luqx", "no2", "o3", "pm10", "pm25k"],
    calculationAllowList: ["minimal", "maximal", "durchschnittlich"],
    calculationSuffix: "e",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ich hätte gerne das ${calculation} vom ${measurand} in ${station} des letzten Jahres.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    calculationAllowList: ["Minimum", "Maximum"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ist der aktuelle Wert des ${measurand} in ${station} ${calculation}?`,
    measurandAllowList: ["Luftqualitätsindex", "luqx", "no2", "o3", "pm10", "pm25k"],
    calculationAllowList: ["kritisch"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ist der aktuelle Wert des ${measurand} in ${station} ${calculation}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    calculationAllowList: ["kritisch"],
    measurandSuffix: "s",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ist der ${measurand}-Wert für die Station ${station} ${calculation}?`,
    calculationAllowList: ["grenzwertig", "extrem", "gefährlich"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Liegt der ${measurand}-Wert für die Station ${station} über einem ${calculation}?`,
    calculationAllowList: ["Grenzwert"],
  },
];

export const questionsStationMeasurandRepresentationCalculation: Array<TrainingQuestion> = [
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Wie war der ${measurand} in ${station} am 23.01.2023, verglichen mit den ${calculation} der letzten 10 Jahre repräsentiert als ${representation}?`,
    measurandAllowList: ["Luftqualitätsindex", "Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
    measurandSuffix: "wert",
    calculationSuffix: "swerten",
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Wie war der ${measurand} Wert in ${station} am 23.01.2023, verglichen mit den ${calculation} der letzten 10 Jahre repräsentiert als ${representation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
    calculationSuffix: "swerten",
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Erstelle mir eine ${representation} für den ${calculation} der ${measurand} Werte von ${station} für die letzten 5 Jahre.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Tabelle", "Liste"],
    calculationAllowList: ["Durchschnitt"],
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Erstelle mir einen ${representation} für den ${calculation} der ${measurand} Werte von ${station} für die letzten 4 Wochen.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Graph"],
    calculationAllowList: ["Durchschnitt"],
    representationSuffix: "en",
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Was waren die ${calculation} der ${measurand} Messungen der letzten Woche in ${station}, repräsentiert als ${representation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Tabelle", "Liste", "Graph"],
    calculationAllowList: ["Minima", "Maxima"],
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Was waren die ${calculation} der ${measurand} Messungen der letzten Woche in ${station}, repräsentiert als ${representation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Tabelle", "Liste", "Graph"],
    calculationAllowList: ["Durchschnitt"],
    calculationSuffix: "swerte",
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Gib mir den ${calculation} ${measurand} in ${station} der letzten 4 Tage als ${representation}.`,
    measurandAllowList: ["Luftqualitätsindex", "Stickstoffdioxid", "Ozon", "Feinstaub PM10", "Feinstaub PM25"],
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
    calculationAllowList: ["minimal", "maximal", "durchschnittlich"],
    measurandSuffix: "wert",
    calculationSuffix: "en",
  },
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Gib mir den ${calculation} ${measurand} Wert in ${station} der letzten 4 Tage als ${representation}.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub PM10",
      "Feinstaub PM25",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
    calculationAllowList: ["minimal", "maximal", "durchschnittlich"],
    calculationSuffix: "en",
  },
];
