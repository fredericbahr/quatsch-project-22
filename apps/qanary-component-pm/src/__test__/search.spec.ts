// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createAnnotationInKnowledgeGraph, IAnnotationInformation } from "qanary-component-helpers";
import { IMeasurand } from "qanary-lubw-data";
import { Domain, IQanaryMessage } from "shared";

import { searchForDomainInstances } from "../utils/search";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  createAnnotationInKnowledgeGraph: jest.fn(() => Promise.resolve()),
}));

describe("check-via-regex", () => {
  const domain = "measurand" as Domain;
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  const measurand: IMeasurand = {
    label: "Luftqualitätsindex",
    id: "luqx",
  };

  it("should find an annotation for `Luftqualitätsindex` (measurand)", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotationInKnowledgeGraph as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der Luftqualitätsindex in Berlin?";
    const expectedAnnotation: IAnnotationInformation = {
      confidence: 1,
      value: measurand.id,
      range: {
        start: 12,
        end: 30,
      },
    };
    const expectedAnnotationType = "qa:AnnotationOfMeasurand";

    await searchForDomainInstances(qanaryMessage, question, domain, measurand);

    expect(mockCreateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        message: qanaryMessage,
        componentName: expect.any(String),
        annotation: expectedAnnotation,
        annotationType: expectedAnnotationType,
      }),
    );
  });

  it("should find an annotation for `luqx` (measurand)", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotationInKnowledgeGraph as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der luqx in Berlin?";
    const expectedAnnotation: IAnnotationInformation = {
      confidence: 1,
      value: measurand.id,
      range: {
        start: 12,
        end: 16,
      },
    };
    const expectedAnnotationType = "qa:AnnotationOfMeasurand";

    await searchForDomainInstances(qanaryMessage, question, domain, measurand);

    expect(mockCreateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        message: qanaryMessage,
        componentName: expect.any(String),
        annotation: expectedAnnotation,
        annotationType: expectedAnnotationType,
      }),
    );
  });

  it("should not throw an error if no measurand is found", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotationInKnowledgeGraph as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der Wasserpegel in Berlin?";

    await searchForDomainInstances(qanaryMessage, question, domain, measurand);

    expect(mockCreateAnnotation).not.toHaveBeenCalled();
  });
});
