// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { selectSparql } from "qanary-component-helpers";
import { Domain } from "shared";

import { getAnnotationsOfInstance } from "../query/annotationOfInstance";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  selectSparql: jest.fn(),
}));

describe("#Component getAnnotationsOfInstance", () => {
  it("should getAnnotationsOfInstance without valid response", async () => {
    (selectSparql as jest.Mock) = jest.fn().mockReturnValueOnce(Promise.resolve([]));

    const annotations = await getAnnotationsOfInstance({});
    expect(annotations).toStrictEqual(null);
  });

  it("should getAnnotationsOfInstance with valid response", async () => {
    (selectSparql as jest.Mock) = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve([{ body: { value: "station" }, start: { value: 0 }, end: { value: 3 } }]));

    const languageCode = await getAnnotationsOfInstance({});
    expect(languageCode).toStrictEqual([{ domain: "station" as Domain, start: 0, end: 3 }]);
  });
});
