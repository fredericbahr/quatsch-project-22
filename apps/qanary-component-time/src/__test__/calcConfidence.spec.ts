import { ParsedResult } from "chrono-node";
import { Component } from "chrono-node/src";

import { calcConfidence } from "../utils/calcConfidence";

describe("#Component calcConfidence", () => {
  const genMockStartParsedResult = (a: Record<"year" | "month" | "day", boolean>) => {
    return {
      index: 0,
      refDate: undefined,
      start: {
        isCertain: (component: Component) => {
          return a[component];
        },
        get: () => null,
        date: () => new Date(),
      },
      text: "",
      date(): Date {
        return new Date();
      },
    };
  };

  const genMockStartEndParsedResult = (a: Record<"year" | "month" | "day", boolean>) => {
    return {
      index: 0,
      refDate: undefined,
      start: {
        isCertain: (component: Component) => {
          return a[component];
        },
        get: () => null,
        date: () => new Date(),
      },
      end: {
        isCertain: (component: Component) => {
          return a[component];
        },
        get: () => null,
        date: () => new Date(),
      },
      text: "",
      date(): Date {
        return new Date();
      },
    };
  };

  it("should calcConfidence be 1", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: true, month: true, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(1);
  });

  it("should calcConfidence be 2/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: true, month: true, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 3);
  });

  it("should calcConfidence be 2/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: true, month: false, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 3);
  });

  it("should calcConfidence be 2/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: false, month: true, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 3);
  });

  it("should calcConfidence be 1/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: false, month: false, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(1 / 3);
  });

  it("should calcConfidence be 1/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: false, month: true, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(1 / 3);
  });

  it("should calcConfidence be 1/3", async () => {
    const mockParsedResult: ParsedResult = genMockStartParsedResult({ year: true, month: false, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(1 / 3);
  });

  it("should calcConfidence be 1", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: true, month: true, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(1);
  });

  it("should calcConfidence be 4/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: true, month: true, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(4 / 6);
  });

  it("should calcConfidence be 4/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: true, month: false, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(4 / 6);
  });

  it("should calcConfidence be 4/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: false, month: true, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(4 / 6);
  });

  it("should calcConfidence be 2/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: false, month: false, day: true });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 6);
  });

  it("should calcConfidence be 2/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: false, month: true, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 6);
  });

  it("should calcConfidence be 2/6", async () => {
    const mockParsedResult: ParsedResult = genMockStartEndParsedResult({ year: true, month: false, day: false });
    const confidence: number = calcConfidence(mockParsedResult);
    expect(confidence).toStrictEqual(2 / 6);
  });
});
