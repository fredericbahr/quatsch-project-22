import { getQuestionUriQuery } from "../utils/question-uri-query";

describe("getQuestionUriQuery", () => {
  it("should return the correct query", () => {
    const inGraph = "http://example.org/graph";
    const expectedQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX oa: <http://www.w3.org/ns/openannotation/core/>
PREFIX qa: <http://www.wdaqua.eu/qa#>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX xmls: <http://www.w3.org/2001/XMLSchema#>
PREFIX stardogintern: <tag:stardog:api:>

SELECT ?questionUri
FROM <${inGraph}>
WHERE {
  ?questionUri a qa:Question.
}
LIMIT 1`;
    const actualQuery = getQuestionUriQuery(inGraph);

    expect(actualQuery).toEqual(expectedQuery);
  });
});
