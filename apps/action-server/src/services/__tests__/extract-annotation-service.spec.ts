import { selectSparql } from "qanary-component-helpers";
import { AnnotationTypes, IQanaryAnnotation, IQanaryMessage } from "shared";

import { AnnotationExtractionService } from "../extraction-service/extract-annotation-service";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  selectSparql: jest.fn(),
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
      annotationType: { value: "qa#AnnotationOfMeasurand" },
      target: { value: "target" },
      body: { value: "body" },
      score: { value: "1" },
      annotatedBy: { value: "annotatedBy" },
      annotatedAt: { value: "annotatedAt" },
    },
  ];

  describe("extractAllAnnotations", () => {
    const mockSelectSparql: jest.Mock = jest.fn().mockResolvedValue(rawAnnotations);
    beforeEach(() => {
      (selectSparql as jest.Mock) = mockSelectSparql;
    });

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
        annotationType: "qa:AnnotationOfMeasurand",
        hasTarget: "target",
        hasBody: "body",
        score: 1,
        annotatedBy: "annotatedBy",
        annotatedAt: "annotatedAt",
      },
    ];

    it("should return an array of annotations", async () => {
      const annotations = await AnnotationExtractionService.extractAllAnnotations(qanaryMessage);
      expect(annotations).toEqual(expectedAnnotations);
    });

    it("should ask the correct query", async () => {
      await AnnotationExtractionService.extractAllAnnotations(qanaryMessage);

      expect(mockSelectSparql).toHaveBeenCalledWith(
        qanaryMessage.endpoint,
        expect.stringContaining("qa:AnnotationOfMeasurand,qa:AnnotationOfStation"),
      );
    });

    it("should throw an error if the query fails", async () => {
      (selectSparql as jest.Mock).mockRejectedValue(new Error("error"));
      await expect(AnnotationExtractionService.extractAllAnnotations(qanaryMessage)).rejects.toThrowError("error");
    });
  });

  describe("extractAnnotationsByType", () => {
    const mockSelectSparql: jest.Mock = jest.fn().mockResolvedValue(rawAnnotations.slice(0, 1));
    beforeEach(() => {
      (selectSparql as jest.Mock) = mockSelectSparql;
    });

    const expectedAnnotations: Array<IQanaryAnnotation> = [
      {
        annotationType: "qa:AnnotationOfStation",
        hasTarget: "target",
        hasBody: "body",
        score: 1,
        annotatedBy: "annotatedBy",
        annotatedAt: "annotatedAt",
      },
    ];

    it("should return an array of annotations", async () => {
      const annotations = await AnnotationExtractionService.extractAnnotationsByType(
        qanaryMessage,
        AnnotationTypes.Station,
      );
      console.log(annotations);
      expect(annotations).toEqual(expectedAnnotations);
    });

    it("should ask the correct query", async () => {
      await AnnotationExtractionService.extractAnnotationsByType(qanaryMessage, AnnotationTypes.Station);

      expect(mockSelectSparql).toHaveBeenCalledWith(
        qanaryMessage.endpoint,
        expect.stringContaining("qa:AnnotationOfStation"),
      );

      expect(selectSparql).not.toHaveBeenCalledWith(
        qanaryMessage.endpoint,
        expect.stringContaining("qa:AnnotationOfMeasurand"),
      );
    });

    it("should throw an error if the query fails", async () => {
      (selectSparql as jest.Mock).mockRejectedValue(new Error("error"));
      await expect(
        AnnotationExtractionService.extractAnnotationsByType(qanaryMessage, AnnotationTypes.Station),
      ).rejects.toThrowError("error");
    });
  });
});
