import { ParsedComponents } from "chrono-node";

import { transformToISOString } from "../utils/transformToISOString";

describe("#Component transformToISOString", () => {
  const genMockParsedComponents = () => {
    return {
      isCertain: () => true,
      get: () => null,
      date: () => new Date("2023-02-14T22:49:35.532Z"),
    };
  };

  it("should transformToISOString return a serialised date", async () => {
    const mockParsedComponents: ParsedComponents = genMockParsedComponents();
    const isoString = transformToISOString(mockParsedComponents);
    expect(isoString).toStrictEqual("2023-02-14T22:49:35.532Z");
  });

  it("should transformToISOString return undefined", async () => {
    const isoString = transformToISOString(null);
    expect(isoString).toStrictEqual(undefined);
  });
});
