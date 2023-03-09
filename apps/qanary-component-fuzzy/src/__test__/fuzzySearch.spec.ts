/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAnnotationInKnowledgeGraph, getDomainInstances, IAnnotationInformation } from "qanary-component-helpers";
import { IStation } from "qanary-lubw-data";
import { Domain, IQanaryMessage } from "shared";

import { AnnotationOfInstance } from "../query/annotationOfInstance";
import { searchForDomainInstances } from "../utils/fuzzySearch";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  getDomainInstances: jest.fn(() => Promise.resolve([])),
  createAnnotationInKnowledgeGraph: jest.fn(() => Promise.resolve()),
}));

describe("#Component fuzzySearch", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  const station: IStation = {
    id: "DEBW019",
    label: "Ulm",
    lat: 48.39686666700575,
    long: 9.97897500038147,
  };
  let mockCreateAnnotation: jest.Mock;
  let mockGetDomainInstances: jest.Mock;

  beforeEach(() => {
    mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotationInKnowledgeGraph as jest.Mock) = mockCreateAnnotation;
    mockGetDomainInstances = jest.fn(() => Promise.resolve([station]));
    (getDomainInstances as jest.Mock) = mockGetDomainInstances;
  });

  it("should annotate `Ulm` (station) for previous NER annotation of `Ulm`", async () => {
    const question = "Wie ist der Luftqualitätsindex in Ulm?";
    const previousAnnotationOfInstance: AnnotationOfInstance = {
      domain: "station" as Domain,
      start: 34,
      end: 37,
    };
    const expectedAnnotation: IAnnotationInformation = {
      confidence: expect.closeTo(1),
      value: station.id,
      range: {
        start: 34,
        end: 37,
      },
    };
    const expectedAnnotationType = "qa:AnnotationOfStation";

    await searchForDomainInstances(qanaryMessage, question, previousAnnotationOfInstance);

    expect(mockGetDomainInstances).toHaveBeenCalled();
    expect(mockCreateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        message: qanaryMessage,
        componentName: "qanary-component-fuzzy",
        annotation: expectedAnnotation,
        annotationType: expectedAnnotationType,
      }),
    );
  });

  it("should annotate `Ulm` (station) for previous NER annotation of `Ullm`", async () => {
    const question = "Wie ist der Luftqualitätsindex in Ullm?";
    const previousAnnotationOfInstance: AnnotationOfInstance = {
      domain: "station" as Domain,
      start: 34,
      end: 38,
    };
    const expectedAnnotation: IAnnotationInformation = {
      confidence: expect.closeTo(0.75),
      value: station.id,
      range: {
        start: 34,
        end: 38,
      },
    };
    const expectedAnnotationType = "qa:AnnotationOfStation";

    await searchForDomainInstances(qanaryMessage, question, previousAnnotationOfInstance);

    expect(mockGetDomainInstances).toHaveBeenCalled();
    expect(mockCreateAnnotation).toHaveBeenCalledWith(
      expect.objectContaining({
        message: qanaryMessage,
        componentName: "qanary-component-fuzzy",
        annotation: expectedAnnotation,
        annotationType: expectedAnnotationType,
      }),
    );
  });

  it("should not throw an error if no match is found", async () => {
    const question = "Wie ist der Luftqualitätsindex in Berlin?";
    const previousAnnotationOfInstance: AnnotationOfInstance = {
      domain: "station" as Domain,
      start: 34,
      end: 40,
    };

    await searchForDomainInstances(qanaryMessage, question, previousAnnotationOfInstance);

    expect(mockCreateAnnotation).not.toHaveBeenCalled();
  });
});
