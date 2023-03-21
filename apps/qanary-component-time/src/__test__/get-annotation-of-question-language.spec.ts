// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { selectSparql } from "qanary-component-helpers";

import { getAnnotationOfQuestionLanguage } from "../query/annotation-of-question-language";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  selectSparql: jest.fn(),
}));

describe("#Component getAnnotationOfQuestionLanguage", () => {
  it("should getAnnotationOfQuestionLanguage without valid response", async () => {
    (selectSparql as jest.Mock) = jest.fn().mockReturnValueOnce(Promise.resolve([]));

    const languageCode = await getAnnotationOfQuestionLanguage({});
    expect(languageCode).toStrictEqual(null);
  });

  it("should getAnnotationOfQuestionLanguage with valid response", async () => {
    (selectSparql as jest.Mock) = jest.fn().mockReturnValueOnce(Promise.resolve([{ languageCode: { value: "mauz" } }]));

    const languageCode = await getAnnotationOfQuestionLanguage({});
    expect(languageCode).toStrictEqual("mauz");
  });
});
