const fs = require("fs");

const stations = [
  "Aalen",
  "Baden-Baden",
  "Bernhausen",
  "Biberach",
  "Eggenstein",
  "Freiburg",
  "Freiburg Schwarzwaldstraße",
  "Friedrichshafen",
  "Gärtringen",
  "Heidelberg",
  "Heilbronn",
  "Heilbronn Weinsberger Straße-Ost",
  "Karlsruhe-Nordwest",
  "Karlsruhe Reinhold-Frank-Straße",
  "Kehl",
  "Konstanz",
  "Leonberg Grabenstraße",
  "Ludwigsburg",
  "Ludwigsburg Schlossstraße",
  "Mannheim Friedrichsring",
  "Mannheim-Nord",
  "Neuenburg",
  "Pfinztal Karlsruher Straße",
  "Pforzheim",
  "Reutlingen",
  "Reutlingen Lederstraße-Ost",
  "Schramberg Oberndorfer Straße",
  "Schwäbische Alb",
  "Schwarzwald-Süd",
  "Stuttgart Am Neckartor",
  "Stuttgart Arnulf-Klett-Platz",
  "Stuttgart-Bad Cannstatt",
  "Stuttgart Hauptstätter Straße",
  "Stuttgart Hohenheimer Straße",
  "Tauberbischofsheim",
  "Tübingen",
  "Tübingen Mühlstraße",
  "Ulm",
  "Villingen-Schwenningen",
  "Weil am Rhein",
  "Wiesloch",
];

const measurands = [
  "Luftqualitätsindex",
  "Stickstoffdioxid",
  "Ozon",
  "Feinstaub",
  "luqx",
  "no2",
  "o3",
  "pm10",
  "pm25k",
];

const calculations = [
  "Minimum",
  "Minima",
  "minimal",
  "Maximum",
  "Maxima",
  "maximal",
  "Durchschnitt",
  "durchschnittlich",
  "Grenzwert",
  "kritisch",
];

const representations = ["Text", "Tabelle", "Liste", "Graph"];

const questionsStationMeasurand = [
  {
    text: ({ measurand, station }) => `Wie ist der ${measurand} in ${station}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
  },
  {
    text: ({ measurand, station }) =>
      `Wie ist der ${measurand} Wert in ${station}?`,
    measurandAllowList: ["luqx", "no2", "o3", "pm10", "pm25k"],
  },
  {
    text: ({ measurand, station }) =>
      `Wie ist der Wert des ${measurand} in ${station}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub"],
    measurandSuffix: "s",
  },
  {
    text: ({ measurand, station }) => `Wie ist der ${measurand} in ${station}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub"],
    measurandSuffix: "wert",
  },
];

const questionsStationMeasurandRepresentation = [
  {
    text: ({ measurand, station, representation }) =>
      `Zeig mir eine ${representation} der ${measurand} Werte der letzten Woche aus ${station}.`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
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
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
    ],
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
      "Feinstaub",
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
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
    ],
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
      "Feinstaub",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    representationAllowList: ["Text"],
  },
];

const questionsStationMeasurandCalculation = [
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war der ${measurand} in ${station} gestern im ${calculation}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
    measurandSuffix: "wert",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war der ${measurand} in ${station} gestern im ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
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
      `Wie hoch war der ${measurand} Wert in ${station} gestern im ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
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
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub"],
    calculationAllowList: ["minimal", "maximal", "durchschnittlich"],
    measurandSuffix: "wert",
    calculationSuffix: "e",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Wie hoch war gestern der ${calculation} ${measurand} in ${station}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
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
      "Feinstaub",
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
      `Was ist der aktuelle ${measurand} Wert in ${station} im Vergleich zum ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    calculationAllowList: ["Grenzwert"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Was ist der aktuelle ${measurand} in ${station} im Vergleich zum ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
    ],
    calculationAllowList: ["Grenzwert"],
    measurandSuffix: "wert",
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Was ist der aktuelle ${measurand} in ${station} im Vergleich zum ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    calculationAllowList: ["Grenzwert"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ist der aktuelle Wert des ${measurand} in ${station} ${calculation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "luqx",
      "no2",
      "o3",
      "pm10",
      "pm25k",
    ],
    calculationAllowList: ["kritisch"],
  },
  {
    text: ({ measurand, station, calculation }) =>
      `Ist der aktuelle Wert des ${measurand} in ${station} ${calculation}?`,
    measurandAllowList: ["Stickstoffdioxid", "Ozon", "Feinstaub"],
    calculationAllowList: ["kritisch"],
    measurandSuffix: "s",
  },
];

const questionsStationMeasurandRepresentationCalculation = [
  {
    text: ({ measurand, station, representation, calculation }) =>
      `Wie war der ${measurand} in ${station} am 23.01.2023, verglichen mit den ${calculation} der letzten 10 Jahre repräsentiert als ${representation}?`,
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
    ],
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
      "Feinstaub",
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
      "Feinstaub",
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
      "Feinstaub",
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
      "Feinstaub",
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
      "Feinstaub",
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
    measurandAllowList: [
      "Luftqualitätsindex",
      "Stickstoffdioxid",
      "Ozon",
      "Feinstaub",
    ],
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
      "Feinstaub",
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

const nerData = [];
const nluData = [];

/**
 * Generates a string out of a given input base string and a prefix and suffix.
 * @param {*} baseString base string to be extended
 * @param {*} prefix
 * @param {*} suffix
 * @returns a pre- and suffixed string or undefined
 */
const generateString = (baseString = null, prefix = "", suffix = "") => {
  return baseString ? `${prefix}${baseString}${suffix}` : undefined;
};

/**
 * Generates training data for ner and nlu from question and provided data
 * @param {*} question question object
 * @param {*} data data object containing station, measurand, representation, calculation
 * @returns trainingDataNer and trainingDataNlu
 */
const generateTrainingData = (
  question,
  { station, measurand, representation, calculation }
) => {
  const measurandString = generateString(
    measurand,
    question.measurandPrefix,
    question.measurandSuffix
  );
  const representationString = generateString(
    representation,
    question.representationPrefix,
    question.representationSuffix
  );
  const calculationString = generateString(
    calculation,
    question.calculationPrefix,
    question.calculationSuffix
  );

  const trainingDataNer = {
    text: question.text({
      station,
      measurand: measurandString,
      representation: representationString,
      calculation: calculationString,
    }),
    language: "de",
    entities: {
      station,
      measurand: measurandString,
      representation: representationString,
      calculation: calculationString,
    },
  };

  const trainingDataNlu = question.text({
    station: `[${station}](station)`,
    measurand: `[${measurandString}](measurand)`,
    representation: `[${representationString}](representation)`,
    calculation: `[${calculationString}](calculation)`,
  });

  return { trainingDataNer, trainingDataNlu };
};

/**
 * Adds provided training data objects to data lists
 * @param {*} trainingDataNer training data object for qanary ner conponent
 * @param {*} trainingDataNlu training data string for rasa nlu
 */
const addToLists = (trainingDataNer, trainingDataNlu) => {
  nerData.push(trainingDataNer);
  nluData.push(trainingDataNlu);
};

/**
 * Writes provided data with necessary structure for qanary ner component into ner-train.json file
 * @param {*} data training data array
 */
const writeJsonFile = (data) => {
  const trainJson = {
    trainingdata: data,
  };

  fs.writeFile(
    "./ner-train.json",
    JSON.stringify(trainJson, null, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          "qanary ner component training data written to 'ner-train.json'"
        );
      }
    }
  );
};

/**
 * Writes provided data with necessary structure for rasa nlu into nlu-train.yml file
 * @param {*} data training data array
 */
const writeYmlFile = (data) => {
  const trainYml = `version: "3.1"

nlu:
  ## Creation of context
  - intent: context_air_measurand
    examples: |
    - ${data.join("\n    - ")}`;

  fs.writeFile("./nlu-train.yml", trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("rasa nlu examples written to 'nlu-train.yml'");
    }
  });
};

/**
 * generates training data for questions with station and measurand slots and adds data to lists
 */
const generateStationMeasurandData = () => {
  questionsStationMeasurand.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList.includes(measurand))
        .forEach((measurand) => {
          const { trainingDataNer, trainingDataNlu } = generateTrainingData(
            question,
            { station, measurand }
          );
          addToLists(trainingDataNer, trainingDataNlu);
        });
    });
  });
};

/**
 * generates training data for questions with station, measurand and representation slots and adds data to lists
 */
const generateStationMeasurandRepresentationData = () => {
  questionsStationMeasurandRepresentation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList.includes(measurand))
        .forEach((measurand) => {
          representations
            .filter((representation) =>
              question.representationAllowList.includes(representation)
            )
            .forEach((representation) => {
              const { trainingDataNer, trainingDataNlu } = generateTrainingData(
                question,
                { station, measurand, representation }
              );
              addToLists(trainingDataNer, trainingDataNlu);
            });
        });
    });
  });
};

/**
 * generates training data for questions with station, measurand and calculation slots and adds data to lists
 */
const generateStationMeasurandCalculationData = () => {
  questionsStationMeasurandCalculation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList.includes(measurand))
        .forEach((measurand) => {
          calculations
            .filter((calculation) =>
              question.calculationAllowList.includes(calculation)
            )
            .forEach((calculation) => {
              const { trainingDataNer, trainingDataNlu } = generateTrainingData(
                question,
                { station, measurand, calculation }
              );
              addToLists(trainingDataNer, trainingDataNlu);
            });
        });
    });
  });
};

/**
 * generates training data for questions with station, measurand, representation and calculation slots and adds data to lists
 */
const generateStationMeasurandRepresentationCalculationData = () => {
  questionsStationMeasurandRepresentationCalculation.forEach((question) => {
    stations.forEach((station) => {
      measurands
        .filter((measurand) => question.measurandAllowList.includes(measurand))
        .forEach((measurand) => {
          representations
            .filter((representation) =>
              question.representationAllowList.includes(representation)
            )
            .forEach((representation) => {
              calculations
                .filter((calculation) =>
                  question.calculationAllowList.includes(calculation)
                )
                .forEach((calculation) => {
                  const { trainingDataNer, trainingDataNlu } =
                    generateTrainingData(question, {
                      station,
                      measurand,
                      representation,
                      calculation,
                    });
                  addToLists(trainingDataNer, trainingDataNlu);
                });
            });
        });
    });
  });
};

generateStationMeasurandData();
generateStationMeasurandRepresentationData();
generateStationMeasurandCalculationData();
generateStationMeasurandRepresentationCalculationData();

writeJsonFile(trainingData);
writeYmlFile(nluExamples);
