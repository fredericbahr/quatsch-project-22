import { IQanaryMessage } from "qanary-component-core";
import { selectSparql } from "qanary-component-helpers";

import { getMeasurands } from "../utils/getMeasurands";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  selectSparql: jest.fn(),
}));

describe("getMeasurands", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };

  const rawMeasurands = [
    {
      label: {
        value: "label",
        datatype: "datatype",
        language: "language",
      },
      id: {
        value: "id",
        datatype: "datatype",
        language: "language",
      },
    },
  ];

  it("should query the available measurands from the knowledge graph", async () => {
    const mockSelectSparql = jest.fn().mockReturnValueOnce(Promise.resolve(rawMeasurands));
    (selectSparql as jest.Mock) = mockSelectSparql;

    await getMeasurands(qanaryMessage);

    const expectedQuery = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

SELECT ?label ?id
FROM <urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd>
WHERE {
    ?measurand a <urn:measurand> .
    ?measurand rdfs:label ?label .
    ?measurand dc:identifier ?id .
}`;

    expect(mockSelectSparql).toHaveBeenCalledWith(qanaryMessage.endpoint, expectedQuery);
  });

  it("should return the measurands", async () => {
    const expectedMeasurands = [
      {
        label: "label",
        id: "id",
      },
    ];

    (selectSparql as jest.Mock).mockReturnValueOnce(Promise.resolve(rawMeasurands));

    const measurands = await getMeasurands(qanaryMessage);

    expect(measurands).toEqual(expectedMeasurands);
  });
});
