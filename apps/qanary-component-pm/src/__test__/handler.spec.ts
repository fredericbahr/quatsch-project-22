/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQanaryMessage } from "qanary-component-core";
import { getQuestion } from "qanary-component-helpers";

import { handler } from "../handler";
import { getDomainInstances } from "../utils/getDomainInstances";
import { searchForDomainInstances } from "../utils/search";

jest.mock("../utils/getDomainInstances", () => ({
  getDomainInstances: jest.fn(() => Promise.resolve([])),
}));

jest.mock("../utils/search", () => ({
  searchForDomainInstances: jest.fn(() => Promise.resolve()),
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

  it("should get the domain instances from the knowledge graph", async () => {
    const mockGetDomainInstances = jest.fn(() => Promise.resolve([]));
    (getDomainInstances as jest.Mock) = mockGetDomainInstances;

    await handler({});

    expect(mockGetDomainInstances).toHaveBeenCalled();
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

  it("should loop over the domain instances and check if via regex", async () => {
    const mockGetDomainInstances = jest.fn(() =>
      Promise.resolve([
        { id: "luqx", label: "Luftqualitätsindex" },
        { id: "o3", label: "Ozon" },
      ]),
    );
    (getDomainInstances as jest.Mock) = mockGetDomainInstances;

    const mockCheckDomainInstancesViaRegex = jest.fn(() => Promise.resolve());
    (searchForDomainInstances as jest.Mock) = mockCheckDomainInstancesViaRegex;

    await handler(qanaryMessage);

    expect(mockCheckDomainInstancesViaRegex).toHaveBeenCalledTimes(2);
  });

  it("should return the message", async () => {
    const mockGetDomainInstances = jest.fn(() => Promise.resolve([]));
    (getDomainInstances as jest.Mock) = mockGetDomainInstances;

    const mockCheckDomainInstancesViaRegex = jest.fn(() => Promise.resolve());
    (searchForDomainInstances as jest.Mock) = mockCheckDomainInstancesViaRegex;

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });
});
