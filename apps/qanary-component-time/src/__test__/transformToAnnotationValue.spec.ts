import { ParsedResult } from "chrono-node";

import { transformToAnnotationValue } from "../utils/transformToAnnotationValue";

describe("#Component transformToAnnotationValue", () => {
  const genMockParsedResult = () => {
    return {
      index: 0,
      refDate: undefined,
      start: {
        isCertain: () => true,
        get: () => null,
        date: () => new Date("2023-02-14T22:49:35.532Z"),
      },
      text: "",
      date(): Date {
        return new Date();
      },
    };
  };

  it("should transformToAnnotationValue return a serialised object", async () => {
    const mockParsedResult: ParsedResult = genMockParsedResult();
    const annotationValue = transformToAnnotationValue(mockParsedResult);
    expect(annotationValue).toStrictEqual('{"text":"","start":"2023-02-14T22:49:35.532Z"}');
  });
});
