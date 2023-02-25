// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getQuestion } from "qanary-component-helpers";
import { IQanaryMessage } from "shared";

import { handler } from "../handler";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getAnnotationOfQuestionLanguage } from "../query/annotationOfQuestionLanguage";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  getQuestion: jest.fn(() => Promise.resolve("")),
  createAnnotationInKnowledgeGraph: jest.fn(),
}));

describe("#Component handler", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  let mockGetQuestion: jest.Mock;

  beforeEach(() => {
    mockGetQuestion = jest.fn(() => Promise.resolve("01.01.2022"));
    (getQuestion as jest.Mock) = mockGetQuestion;
  });

  it("should get the annotation of question language from the knowledge graph", async () => {
    const mockGetAnnotationOfQuestionLanguage = jest.fn(() => Promise.resolve([]));
    (getAnnotationOfQuestionLanguage as jest.Mock) = mockGetAnnotationOfQuestionLanguage;

    await handler({});

    expect(mockGetAnnotationOfQuestionLanguage).toHaveBeenCalled();
  });

  it("should get the question", async () => {
    await handler(qanaryMessage);

    expect(mockGetQuestion).toHaveBeenCalled();
  });

  it("should throw an error if it cannot get the question", async () => {
    (getQuestion as jest.Mock) = jest.fn(() => Promise.resolve(null));

    await expect(handler(qanaryMessage)).rejects.toThrowError();
  });

  it("should return the message", async () => {
    (getAnnotationOfQuestionLanguage as jest.Mock) = jest.fn(() => Promise.resolve(null));

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });

  it("should return the message", async () => {
    (getAnnotationOfQuestionLanguage as jest.Mock) = jest.fn(() => Promise.resolve("de"));

    const result = await handler(qanaryMessage);

    expect(result).toEqual(qanaryMessage);
  });
});
