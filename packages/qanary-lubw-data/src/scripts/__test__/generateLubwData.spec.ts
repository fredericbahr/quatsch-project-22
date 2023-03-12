import generateLubwData from "../utils/generateLubwData";

describe("#Component generateLubwData", () => {
  const genMockStationData = () => {
    return [
      "DEBW029",
      "Aalen",
      "DEBW076",
      "Baden-Baden",
      "DEBW042",
      "Bernhausen",
      "DEBW046",
      "Biberach",
      "DEBW004",
      "Eggenstein",
      "DEBW084",
      "Freiburg",
      "DEBW122",
      "Freiburg Schwarzwaldstraße",
      "DEBW038",
      "Friedrichshafen",
      "DEBW112",
      "Gärtringen",
      "DEBW009",
      "Heidelberg",
      "DEBW015",
      "Heilbronn",
      "DEBW152",
      "Heilbronn Weinsberger Straße-Ost",
      "DEBW081",
      "Karlsruhe-Nordwest",
      "DEBW080",
      "Karlsruhe Reinhold-Frank-Straße",
      "DEBW022",
      "Kehl",
      "DEBW052",
      "Konstanz",
      "DEBW120",
      "Leonberg Grabenstraße",
      "DEBW024",
      "Ludwigsburg",
      "DEBW241",
      "Ludwigsburg Schlossstraße",
      "DEBW098",
      "Mannheim Friedrichsring",
      "DEBW005",
      "Mannheim-Nord",
      "DEBW073",
      "Neuenburg",
      "DEBW125",
      "Pfinztal Karlsruher Straße",
      "DEBW033",
      "Pforzheim",
      "DEBW027",
      "Reutlingen",
      "DEBW147",
      "Reutlingen Lederstraße-Ost",
      "DEBW156",
      "Schramberg Oberndorfer Straße",
      "DEBW087",
      "Schwäbische Alb",
      "DEBW031",
      "Schwarzwald-Süd",
      "DEBW118",
      "Stuttgart Am Neckartor",
      "DEBW099",
      "Stuttgart Arnulf-Klett-Platz",
      "DEBW013",
      "Stuttgart-Bad Cannstatt",
      "LUBW082",
      "Stuttgart Hauptstätter Straße",
      "DEBW116",
      "Stuttgart Hohenheimer Straße",
      "DEBW059",
      "Tauberbischofsheim",
      "DEBW107",
      "Tübingen",
      "DEBW136",
      "Tübingen Mühlstraße",
      "DEBW019",
      "Ulm",
      "DEBW039",
      "Villingen-Schwenningen",
      "DEBW023",
      "Weil am Rhein",
      "DEBW010",
      "Wiesloch",
    ];
  };

  const genMockMeasurandData = () => {
    return [
      "luqx",
      "Luftqualitätsindex",
      "no2",
      "Stickstoffdioxid",
      "o3",
      "Ozon",
      "pm10",
      "Feinstaub PM10",
      "pm25k",
      "Feinstaub PM25",
    ];
  };

  const genMockRepresentationData = () => {
    return ["Text", "Tabelle", "Liste", "Graph"];
  };

  const genMockCalculationData = () => {
    return [
      "Minimum",
      "Maximum",
      "Durchschnitt",
      "Grenzwert",
      "Minima",
      "minimal",
      "Maxima",
      "maximal",
      "durchschnittlich",
      "kritisch",
    ];
  };

  it("should return a list of all station ids and labels", async () => {
    const lubwData = generateLubwData();
    expect(lubwData.stations).toStrictEqual(genMockStationData());
  });

  it("should return a list of all measurand ids and labels", async () => {
    const lubwData = generateLubwData();
    expect(lubwData.measurands).toStrictEqual(genMockMeasurandData());
  });

  it("should return a list of all representation labels", async () => {
    const lubwData = generateLubwData();
    expect(lubwData.representations).toStrictEqual(genMockRepresentationData());
  });

  it("should return a list of all calculation labels and additional entries", async () => {
    const lubwData = generateLubwData();
    expect(lubwData.calculations).toStrictEqual(genMockCalculationData());
  });
});
