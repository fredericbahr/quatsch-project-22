/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQanaryMessage } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";

import { handler } from "../handler";
import { checkMeasurandViaRegex } from "../utils/check-via-regex";
import { getMeasurands } from "../utils/getMeasurands";

jest.mock("../utils/getMeasurands", () => ({
  getMeasurands: jest.fn(() => Promise.resolve([])),
}));

jest.mock("../utils/check-via-regex", () => ({
  checkMeasurandViaRegex: jest.fn(() => Promise.resolve()),
}));

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  getQuestion: jest.fn(() => Promise.resolve("")),
}));

describe("handler", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  let mockGetQuestion: jest.Mock;

  beforeEach(() => {
    mockGetQuestion = jest.fn(() => Promise.resolve("question"));
    (getQuestion as jest.Mock) = mockGetQuestion;
  });

  it("should get the measurands from the knowledge graph", async () => {
    const mockGetMeasurands = jest.fn(() => Promise.resolve([]));
    (getMeasurands as jest.Mock) = mockGetMeasurands;

    await handler({});

    expect(mockGetMeasurands).toHaveBeenCalled();
  });

  it("should get the question", async () => {
    await handler(qanaryMessage);

    expect(mockGetQuestion).toHaveBeenCalled();
  });

  it("should throw an error if it cannot get the question", async () => {
    const mockGetQuestion = jest.fn(() => Promise.resolve(null));
    (getQuestion as jest.Mock) = mockGetQuestion;

    await expect(handler(qanaryMessage)).rejects.toThrowError();
  });

  it("should loop over the measurands and check if via regex", async () => {
    const mockGetMeasurands = jest.fn(() =>
      Promise.resolve([
        { id: "luqx", label: "Luftqualitätsindex" },
        { id: "o3", label: "Ozon" },
      ]),
    );
    (getMeasurands as jest.Mock) = mockGetMeasurands;

    const mockCheckMeasurandViaRegex = jest.fn(() => Promise.resolve());
    (checkMeasurandViaRegex as jest.Mock) = mockCheckMeasurandViaRegex;

    await handler(qanaryMessage);

    expect(mockCheckMeasurandViaRegex).toHaveBeenCalledTimes(2);
  });

  it("should return the message", async () => {
    const mockGetMeasurands = jest.fn(() => Promise.resolve([]));
    (getMeasurands as jest.Mock) = mockGetMeasurands;

    const mockCheckMeasurandViaRegex = jest.fn(() => Promise.resolve());
    (checkMeasurandViaRegex as jest.Mock) = mockCheckMeasurandViaRegex;

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });
});
