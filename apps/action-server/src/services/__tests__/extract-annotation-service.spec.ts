import { selectSparql } from "qanary-component-helpers";
import { IQanaryAnnotation, IQanaryMessage } from "shared";

import { AnnotationExtractionService } from "../extraction-service.ts/extract-annotation-service";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  selectSparql: jest.fn(),
  queryFileLoader: jest.fn().mockReturnValue(""),
}));

describe("Extract Annotation Service", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };

  const rawAnnotations = [
    {
      annotation: { value: "1" },
      annotationType: { value: "qa#AnnotationOfStation" },
      target: { value: "target" },
      body: { value: "body" },
      score: { value: "1" },
      annotatedBy: { value: "annotatedBy" },
      annotatedAt: { value: "annotatedAt" },
    },
    {
      annotation: { value: "2" },
      annotationType: { value: "qa#AnnotationOfStation" },
      target: { value: "target" },
      body: { value: "body" },
      score: { value: "1" },
      annotatedBy: { value: "annotatedBy" },
      annotatedAt: { value: "annotatedAt" },
    },
  ];

  const expectedAnnotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasTarget: "target",
      hasBody: "body",
      score: 1,
      annotatedBy: "annotatedBy",
      annotatedAt: "annotatedAt",
    },
    {
      annotationType: "qa:AnnotationOfStation",
      hasTarget: "target",
      hasBody: "body",
      score: 1,
      annotatedBy: "annotatedBy",
      annotatedAt: "annotatedAt",
    },
  ];

  beforeEach(() => {
    (selectSparql as jest.Mock).mockResolvedValue(rawAnnotations);
  });

  it("should return an array of annotations", async () => {
    const annotations = await AnnotationExtractionService.extractAnnotations(qanaryMessage);
    expect(annotations).toEqual(expectedAnnotations);
  });

  it("should throw an error if the query fails", async () => {
    (selectSparql as jest.Mock).mockRejectedValue(new Error("error"));
    await expect(AnnotationExtractionService.extractAnnotations(qanaryMessage)).rejects.toThrowError("error");
  });
});
