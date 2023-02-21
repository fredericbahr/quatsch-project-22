import { IQanaryMessage } from "qanary-component-core";
import { selectSparql } from "qanary-component-helpers";

import { IQanaryAnnotation } from "../../interfaces/annotations";
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
      annotation: "1",
      annotationType: "qa#AnnotationOfStation",
      target: "target",
      body: "body",
      score: "1",
      annotatedBy: "annotatedBy",
      annotatedAt: "annotatedAt",
    },
    {
      annotation: "2",
      annotationType: "qa#AnnotationOfStation",
      target: "target",
      body: "body",
      score: "1",
      annotatedBy: "annotatedBy",
      annotatedAt: "annotatedAt",
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
});
