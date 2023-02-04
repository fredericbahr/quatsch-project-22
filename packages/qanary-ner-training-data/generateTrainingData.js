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

const calculations = ["Minimum", "Maximum", "Durchschnitt", "Grenzwert"];

const representations = ["Text", "Tabelle", "Liste", "Graph"];

const trainingData = [];
const nluExamples = [];

const generateString = (string = null, prefix = "", suffix = "") => {
  return string ? `${prefix}${string}${suffix}` : undefined;
};

const addToLists = (
  question,
  { station, measurand, representation, calculation }
) => {
  measurandString = generateString(
    measurand,
    question.measurandPrefix,
    question.measurandSuffix
  );
  representationString = generateString(
    representation,
    question.representationPrefix,
    question.representationSuffix
  );
  calculationString = generateString(
    calculation,
    question.calculationPrefix,
    question.calculationSuffix
  );

  trainingData.push({
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
  });
  nluExamples.push(
    question.text({
      station: `[${station}](station)`,
      measurand: `[${measurandString}](measurand)`,
      representation: `[${representationString}](representation)`,
      calculation: `[${calculationString}](calculation)`,
    })
  );
};

const writeJsonFile = (data) => {
  const trainJson = {
    trainingdata: data,
  };

  fs.writeFile("./train.json", JSON.stringify(trainJson, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("qanary ner component training data written to 'train.json'");
    }
  });
};

const writeYmlFile = (data) => {
  const trainYml = `version: "3.1"

nlu:
  ## Creation of context
  - intent: context_air_measurand
    examples: |
    - ${data.join("\n    - ")}`;

  fs.writeFile("./air_measurand.yml", trainYml, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("rasa nlu examples written to 'air_measurand.yml'");
    }
  });
};

const questions1 = [
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

const questions2 = [
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
];

const questions3 = [
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
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
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
    representationAllowList: ["Text", "Tabelle", "Liste", "Graph"],
    calculationAllowList: ["Minimum", "Maximum", "Durchschnitt"],
  },
];

const questions4 = [
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
];

questions1.forEach((question) => {
  stations.forEach((station) => {
    measurands
      .filter((measurand) => question.measurandAllowList.includes(measurand))
      .forEach((measurand) => {
        addToLists(question, { station, measurand });
      });
  });
});

questions2.forEach((question) => {
  stations.forEach((station) => {
    measurands
      .filter((measurand) => question.measurandAllowList.includes(measurand))
      .forEach((measurand) => {
        representations
          .filter((representation) =>
            question.representationAllowList.includes(representation)
          )
          .forEach((representation) => {
            addToLists(question, { station, measurand, representation });
          });
      });
  });
});

questions3.forEach((question) => {
  stations.forEach((station) => {
    measurands
      .filter((measurand) => question.measurandAllowList.includes(measurand))
      .forEach((measurand) => {
        calculations
          .filter((calculation) =>
            question.calculationAllowList.includes(calculation)
          )
          .forEach((calculation) => {
            addToLists(question, { station, measurand, calculation });
          });
      });
  });
});

questions4.forEach((question) => {
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
                addToLists(question, {
                  station,
                  measurand,
                  representation,
                  calculation,
                });
              });
          });
      });
  });
});

writeJsonFile(trainingData);
writeYmlFile(nluExamples);
