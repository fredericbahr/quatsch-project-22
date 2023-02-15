import fs from "fs";

import { queryFileLoader, RESERVED_KEYWORD_IN_SPARQL_QUERY } from "../query-file-loader";

describe("queryFileLoader", () => {
  it("should return an untransformed query", () => {
    const originalText = `SELECT *
                          FROM <YOUR_CURRENT_GRAPH_ID>
                          WHERE { ?annotation a qa:AnnotationOfQuestionLanguage.?annotation oa:hasBody ?languageCode.}`;

    const transformedText = originalText;

    jest.spyOn(fs, "readFileSync").mockReturnValueOnce(originalText);
    const actualQuery = queryFileLoader("", []);
    expect(actualQuery).toEqual(transformedText);
  });

  it("should return a transformed query", () => {
    const originalText = `SELECT *
                          FROM <YOUR_CURRENT_GRAPH_ID>
                          WHERE { ?annotation a qa:AnnotationOfQuestionLanguage.?annotation oa:hasBody ?languageCode.}`;

    const transformedText = `SELECT *
                          FROM <Test>
                          WHERE { ?annotation a qa:AnnotationOfQuestionLanguage.?annotation oa:hasBody ?languageCode.}`;

    jest.spyOn(fs, "readFileSync").mockReturnValueOnce(originalText);
    const actualQuery = queryFileLoader("", [
      {
        keyword: RESERVED_KEYWORD_IN_SPARQL_QUERY.YOUR_CURRENT_GRAPH_ID,
        replacement: "Test",
      },
    ]);
    expect(actualQuery).toEqual(transformedText);
  });
});
