import { Domain, ICalculation, IMeasurand, IRepresentation, IStation } from "qanary-lubw-data";

import {
  generateAdditionalTriples,
  getCalculationTriples,
  getClassDefinitions,
  getMeasurandTriples,
  getPrefixes,
  getRepresentationTriples,
  getStationTriples,
} from "../seeding-helpers";

describe("seeding helpers", () => {
  describe("getPrefixes", () => {
    it("should return the prefixes", () => {
      const prefixes = getPrefixes();

      expect(prefixes).toEqual(expect.stringContaining("PREFIX"));
    });
  });

  describe("getClassDefinitions", () => {
    it("should return the class definitions for one domain", () => {
      const domains = [Domain.Station];

      const classDefinitions = getClassDefinitions(domains);

      expect(classDefinitions).toEqual("<urn:station a rdfs:Class> .\n");
    });

    it("should return the class definitions for multiple domains", () => {
      const domains = [Domain.Station, Domain.Measurand];

      const classDefinitions = getClassDefinitions(domains);

      expect(classDefinitions).toEqual("<urn:station a rdfs:Class> .\n<urn:measurand a rdfs:Class> .\n");
    });
  });

  describe("getStationTriples", () => {
    it("should return an empty string if the array is empty", () => {
      const stations: IStation[] = [];

      const stationTriples = getStationTriples(stations);

      expect(stationTriples).toEqual("");
    });

    it("should return the station triples for one station", () => {
      const stations: IStation[] = [
        { id: "DEBW029", label: "Aalen", lat: 48.84791111098396, long: 10.096291667090522 },
      ];

      const stationTriples = getStationTriples(stations);

      expect(stationTriples).toEqual(`<urn:DEBW029 a <urn:station> ;
  identity:id \\"DEBW029\\" ;
  rdfs:label \\"Aalen\\" ;
  geo:lat \\"48.84791111098396\\" ;
  geo:long \\"10.096291667090522\\" .`);
    });

    it("should return the station triples for multiple stations", () => {
      const stations: IStation[] = [
        { id: "DEBW029", label: "Aalen", lat: 48.84791111098396, long: 10.096291667090522 },
        { id: "DEBW076", label: "Baden-Baden", lat: 48.77307222207387, long: 8.22021111117469 },
      ];

      const stationTriples = getStationTriples(stations);

      expect(stationTriples).toEqual(`<urn:DEBW029 a <urn:station> ;
  identity:id \\"DEBW029\\" ;
  rdfs:label \\"Aalen\\" ;
  geo:lat \\"48.84791111098396\\" ;
  geo:long \\"10.096291667090522\\" .
<urn:DEBW076 a <urn:station> ;
  identity:id \\"DEBW076\\" ;
  rdfs:label \\"Baden-Baden\\" ;
  geo:lat \\"48.77307222207387\\" ;
  geo:long \\"8.22021111117469\\" .`);
    });
  });

  describe("getMeasurandTriples", () => {
    it("should return an empty string if the array is empty", () => {
      const measurands: IMeasurand[] = [];

      const measurandTriples = getMeasurandTriples(measurands);

      expect(measurandTriples).toEqual("");
    });

    it("should return the measurand triples for one measurand", () => {
      const measurands: IMeasurand[] = [{ id: "temperature", label: "Temperature" }];

      const measurandTriples = getMeasurandTriples(measurands);

      expect(measurandTriples).toEqual(`<urn:temperature a <urn:measurand> ;
  identity:id \\"temperature\\" ;
  rdfs:label \\"Temperature\\" .`);
    });

    it("should return the measurand triples for multiple measurands", () => {
      const measurands: IMeasurand[] = [
        { id: "temperature", label: "Temperature" },
        { id: "precipitation", label: "Precipitation" },
      ];

      const measurandTriples = getMeasurandTriples(measurands);

      expect(measurandTriples).toEqual(`<urn:temperature a <urn:measurand> ;
  identity:id \\"temperature\\" ;
  rdfs:label \\"Temperature\\" .
<urn:precipitation a <urn:measurand> ;
  identity:id \\"precipitation\\" ;
  rdfs:label \\"Precipitation\\" .`);
    });
  });

  describe("getCalculationTriples", () => {
    it("should return an empty string if the array is empty", () => {
      const calculations: ICalculation[] = [];

      const calculationTriples = getCalculationTriples(calculations);

      expect(calculationTriples).toEqual("");
    });

    it("should return the calculation triples for one calculation", () => {
      const calculations: ICalculation[] = [
        {
          id: "avg",
          label: "Average",
        },
      ];

      const calculationTriples = getCalculationTriples(calculations);

      expect(calculationTriples).toEqual(`<urn:avg a <urn:calculation> ;
  identity:id \\"avg\\" ;
  rdfs:label \\"Average\\" .`);
    });

    it("should return the calculation triples for multiple calculations", () => {
      const calculations: ICalculation[] = [
        {
          id: "avg",
          label: "Average",
        },
        {
          id: "max",
          label: "Maximum",
        },
      ];

      const calculationTriples = getCalculationTriples(calculations);

      expect(calculationTriples).toEqual(`<urn:avg a <urn:calculation> ;
  identity:id \\"avg\\" ;
  rdfs:label \\"Average\\" .
<urn:max a <urn:calculation> ;
  identity:id \\"max\\" ;
  rdfs:label \\"Maximum\\" .`);
    });
  });

  describe("getRepresentationTriples", () => {
    it("should return an empty string if the array is empty", () => {
      const representations: IRepresentation[] = [];

      const representationTriples = getRepresentationTriples(representations);

      expect(representationTriples).toEqual("");
    });

    it("should return the representation triples for one representation", () => {
      const representations: IRepresentation[] = [
        {
          id: "text",
          label: "Text",
        },
      ];

      const representationTriples = getRepresentationTriples(representations);

      expect(representationTriples).toEqual(`<urn:text a <urn:representation> ;
  identity:id \\"text\\" ;
  rdfs:label \\"Text\\" .`);
    });

    it("should return the representation triples for multiple representations", () => {
      const representations: IRepresentation[] = [
        {
          id: "text",
          label: "Text",
        },
        {
          id: "graph",
          label: "Graph",
        },
      ];

      const representationTriples = getRepresentationTriples(representations);

      expect(representationTriples).toEqual(`<urn:text a <urn:representation> ;
  identity:id \\"text\\" ;
  rdfs:label \\"Text\\" .
<urn:graph a <urn:representation> ;
  identity:id \\"graph\\" ;
  rdfs:label \\"Graph\\" .`);
    });
  });

  describe("generateAdditionTriples", () => {
    it("should return only prefixes and domain definition if nothing is provided", () => {
      const triples = generateAdditionalTriples({});

      expect(triples).toEqual(
        expect.stringContaining(`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX identity: <http://www.identity.org/ontologies/identity.owl>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos>

<urn:station a rdfs:Class> .
<urn:measurand a rdfs:Class> .
<urn:calculation a rdfs:Class> .
<urn:representation a rdfs:Class> .`),
      );
    });

    it("should return the addition triples for one station, one measurand, one calculation and one representation", () => {
      const domains: Domain[] = [Domain.Station, Domain.Measurand, Domain.Calculation, Domain.Representation];
      const stations: IStation[] = [
        { id: "DEBW029", label: "Aalen", lat: 48.84791111098396, long: 10.096291667090522 },
      ];
      const measurands: IMeasurand[] = [{ id: "temperature", label: "Temperature" }];
      const calculations: ICalculation[] = [
        {
          id: "avg",
          label: "Average",
        },
      ];
      const representations: IRepresentation[] = [
        {
          id: "text",
          label: "Text",
        },
      ];

      const triples = generateAdditionalTriples({ domains, stations, measurands, calculations, representations });

      expect(triples).toEqual(expect.stringContaining(`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX identity: <http://www.identity.org/ontologies/identity.owl>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos>

<urn:station a rdfs:Class> .
<urn:measurand a rdfs:Class> .
<urn:calculation a rdfs:Class> .
<urn:representation a rdfs:Class> .

<urn:DEBW029 a <urn:station> ;
  identity:id \\"DEBW029\\" ;
  rdfs:label \\"Aalen\\" ;
  geo:lat \\"48.84791111098396\\" ;
  geo:long \\"10.096291667090522\\" .
<urn:temperature a <urn:measurand> ;
  identity:id \\"temperature\\" ;
  rdfs:label \\"Temperature\\" .
<urn:avg a <urn:calculation> ;
  identity:id \\"avg\\" ;
  rdfs:label \\"Average\\" .
<urn:text a <urn:representation> ;
  identity:id \\"text\\" ;
  rdfs:label \\"Text\\" .`));
    });
  });
});
