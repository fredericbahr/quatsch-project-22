import {
  ILUBWData,
  ILUBWMeasurandData,
  IQanaryAnnotation,
  IQanaryMessage,
  IRepresentationData,
  RasaRequest,
  RasaResponse,
  REPRESENTATION_TYPE,
} from "shared";

import { AnnotationExtractionService } from "../../../../services/extraction-service/extract-annotation-service";
import { LUBWQueryService } from "../../../../services/lubw-query-service";
import { RepresentationService } from "../../../../services/representation-service";
import { LUBWDataTransformationService } from "../../../../services/transformation-service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { startQanaryPipeline } from "../../../../utils/start-pipeline";
import { measurandAirRequestHandler } from "../measurand-air.controller";

jest.mock("../../../../utils/start-pipeline", () => ({
  startQanaryPipeline: jest.fn(),
}));

jest.mock("../../../../services/extraction-service/extract-annotation-service", () => ({
  AnnotationExtractionService: {
    extractAllAnnotations: jest.fn(() => []),
  },
}));

jest.mock("../../../../services/lubw-query-service", () => ({
  LUBWQueryService: {
    queryLUBWAPI: jest.fn(() => []),
  },
}));

jest.mock("../../../../services/representation-service", () => ({
  ...jest.requireActual("../../../../services/representation-service"),
  RepresentationService: {
    getRepresentation: jest.fn(() => []),
  },
}));

xdescribe("#Measurand controllers", () => {
  const text = "Ich bin der Test-Text";
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  const annotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "Aalen",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:station-pattern-matching>",
      score: 1,
    },
    {
      annotationType: "qa:AnnotationOfTime",
      hasBody: JSON.stringify({ start: new Date(), end: new Date() }),
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:qanary-component-time>",
      score: 1,
    },
  ];
  const lubwData: ILUBWData = {
    calculation: "average",
    measurand: "luqx",
    station: "DEBW0081",
    time: "1d",
    representation: "text",
  };
  const measurandData: ILUBWMeasurandData = {
    ...lubwData,
    measurandData: [
      {
        metric: "kit.iai.test.luqx",
        labels: {},
        metaData: {},
        times: [1677003319],
        values: [2.0],
      },
    ],
  };
  const representation: IRepresentationData = {
    value: "Die Luftqualität in Aalen ist gut.",
    type: REPRESENTATION_TYPE.TEXT,
  };

  const req: RasaRequest = { body: { tracker: { latest_message: { text } } } } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  const mockStartQanaryPipeline: jest.Mock = jest.fn().mockResolvedValue(qanaryMessage);
  const mockExtractAllAnnotations: jest.Mock = jest.fn().mockResolvedValue(annotations);
  const mockGetTransformedLUBWData: jest.Mock = jest.fn().mockReturnValue(measurandData);
  const mockQueryLUBWAPI: jest.Mock = jest.fn().mockResolvedValue(measurandData);
  const mockGetRepresentation: jest.Mock = jest.fn().mockReturnValue(representation);

  beforeEach(() => {
    (startQanaryPipeline as jest.Mock) = mockStartQanaryPipeline;
    (AnnotationExtractionService.extractAllAnnotations as jest.Mock) = mockExtractAllAnnotations;
    (LUBWDataTransformationService.getTransformedLUBWData as jest.Mock) = mockGetTransformedLUBWData;
    (LUBWQueryService.queryLUBWAPI as jest.Mock) = mockQueryLUBWAPI;
    (RepresentationService.getRepresentation as jest.Mock) = mockGetRepresentation;
  });

  afterEach(() => jest.clearAllMocks());

  describe("Qanary Pipeline", () => {
    it("should start the qanary pipeline with given question", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(text, expect.any(Array));
    });

    it("should start the qanary pipeline with correct components", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([
          "qanary-component-pm-station",
          "qanary-component-pm-measurand",
          "qanary-component-pm-calculation",
          "qanary-component-pm-representation",
          "qanary-component-time",
        ]),
      );
    });
  });

  describe("Annotation Extraction", () => {
    it("should call the annotation extraction service with the qanary message", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockExtractAllAnnotations).toHaveBeenCalledWith(qanaryMessage);
    });
  });

  describe("Transformation", () => {
    it("should call the transformation service with the annotations", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockGetTransformedLUBWData).toHaveBeenCalledWith(expect.objectContaining(annotations));
    });
  });

  describe("LUBW Data", () => {
    it("should call the LUBW Query Service with the annotations", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockQueryLUBWAPI).toHaveBeenCalledWith(expect.objectContaining(lubwData));
    });
  });

  describe("Representation", () => {
    it("should call the representation service with the measurand data", async () => {
      await measurandAirRequestHandler(req, res);

      expect(mockGetRepresentation).toHaveBeenCalledWith(expect.objectContaining(measurandData));
    });
  });

  describe("Response", () => {
    it("should return the correct response", async () => {
      await measurandAirRequestHandler(req, res);

      expect(res.json).toHaveBeenCalledWith({
        responses: [{ text: representation.value, response: "" }],
      });
    });
  });

  describe("Error Handling", () => {
    it("should return an error response if an error occurs", async () => {
      mockStartQanaryPipeline.mockRejectedValue(new Error("Error"));

      await measurandAirRequestHandler(req, res);

      expect(res.json).toHaveBeenCalledWith({
        responses: [{ text: expect.any(String), response: "" }],
      });
    });
  });
});
