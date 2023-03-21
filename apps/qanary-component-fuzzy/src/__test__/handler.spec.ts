/* eslint-disable @typescript-eslint/no-unused-vars */
import { getQuestion } from "qanary-component-helpers";
import { IQanaryMessage } from "shared";

import { handler } from "../handler";
import { getAnnotationsOfInstance } from "../query/annotation-of-instance";
import { searchForDomainInstances } from "../utils/fuzzy-search";

jest.mock("../utils/fuzzy-search", () => ({
  searchForDomainInstances: jest.fn(() => Promise.resolve()),
}));

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  getQuestion: jest.fn(() => Promise.resolve("")),
}));

describe("#Component handler", () => {
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

  it("should get the annotations of instance from the knowledge graph", async () => {
    const mockGetAnnotationsOfInstance = jest.fn(() => Promise.resolve([]));
    (getAnnotationsOfInstance as jest.Mock) = mockGetAnnotationsOfInstance;

    await handler({});

    expect(mockGetAnnotationsOfInstance).toHaveBeenCalled();
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

  it("should loop over the annotations of instance and check via fuzzy compare", async () => {
    const mockGetDomainInstances = jest.fn(() =>
      Promise.resolve([
        {
          domain: "measurand",
          start: 0,
          end: 2,
        },
        {
          domain: "station",
          start: 3,
          end: 7,
        },
      ]),
    );
    (getAnnotationsOfInstance as jest.Mock) = mockGetDomainInstances;

    const mockCheckDomainInstancesViaFuzzy = jest.fn(() => Promise.resolve());
    (searchForDomainInstances as jest.Mock) = mockCheckDomainInstancesViaFuzzy;

    await handler(qanaryMessage);

    expect(mockCheckDomainInstancesViaFuzzy).toHaveBeenCalledTimes(2);
  });

  it("should return the message if no previous annotations exist", async () => {
    const mockGetDomainInstances = jest.fn(() => Promise.resolve(null));
    (getAnnotationsOfInstance as jest.Mock) = mockGetDomainInstances;

    const mockCheckDomainInstancesViaFuzzy = jest.fn(() => Promise.resolve());
    (searchForDomainInstances as jest.Mock) = mockCheckDomainInstancesViaFuzzy;

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });

  it("should return the message", async () => {
    const mockGetDomainInstances = jest.fn(() => Promise.resolve([]));
    (getAnnotationsOfInstance as jest.Mock) = mockGetDomainInstances;

    const mockCheckDomainInstancesViaFuzzy = jest.fn(() => Promise.resolve());
    (searchForDomainInstances as jest.Mock) = mockCheckDomainInstancesViaFuzzy;

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });
});
