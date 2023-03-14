import { expect } from "@jest/globals";
import {
  COMPONENT,
  ILUBWData,
  ILUBWDataKey,
  IQanaryAnnotation,
  IQanaryMessage,
  RasaRequest,
  RasaResponse,
  REPRESENTATION_TYPE,
} from "shared";
import { CALCULATION_TYPE } from "shared";

import { NoIntentHandlerError } from "../../../../errors/NoIntentHandlerError";
import { VerificationError } from "../../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../../services/extraction-service/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../../services/intent-handler-finding-service";
import { StoringService } from "../../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../../services/transformation-service";
import { VerificationService } from "../../../../services/verification-service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { startQanaryPipeline } from "../../../../utils/start-pipeline";
import { abstractRequestHandler } from "../abstract.controller";

jest.mock("../../../../utils/start-pipeline", () => ({
  startQanaryPipeline: jest.fn(),
}));

jest.mock("../../../../services/transformation-service", () => ({
  LUBWDataTransformationService: {
    getTransformedLUBWData: jest.fn(),
  },
}));

jest.mock("../../../../services/extraction-service/extract-annotation-service", () => ({
  AnnotationExtractionService: {
    extractAllAnnotations: jest.fn(() => []),
  },
}));

jest.mock("../../../../services/storing-service", () => ({
  StoringService: {
    storeCurrentState: jest.fn(),
    getCurrentState: jest.fn(),
  },
}));

jest.mock("../../../../services/verification-service", () => ({
  VerificationService: {
    verifyLUBWData: jest.fn(),
  },
}));

jest.mock("../../../../services/intent-handler-finding-service", () => ({
  IntentHandlerFindingService: {
    findIntentHandlerByIntent: jest.fn(),
  },
}));

jest.mock("../../../../services/error-handling-service", () => ({
  ErrorHandlingService: {
    handleNoIntentHandlerError: jest.fn(),
    handleVerificationError: jest.fn(),
    handleDefaultError: jest.fn(),
  },
}));

describe("#Measurand controllers", () => {
  const senderId = "test-sender-id";
  const intent = "action_measurand_complete";
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
    calculation: CALCULATION_TYPE.Average,
    measurand: "luqx",
    station: "DEBW081",
    time: {
      start: new Date("2023-02-21T00:00:00.000Z"),
      end: new Date("2023-02-21T23:59:59.999Z"),
    },
    representation: REPRESENTATION_TYPE.Text,
  };

  const req: RasaRequest = {
    body: { next_action: intent, sender_id: senderId, tracker: { latest_message: { text } } },
  } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  const mockStartQanaryPipeline: jest.Mock = jest.fn().mockResolvedValue(qanaryMessage);
  const mockExtractAllAnnotations: jest.Mock = jest.fn().mockResolvedValue(annotations);
  const mockGetTransformedLUBWData: jest.Mock = jest.fn().mockReturnValue(lubwData);
  const mockStoreData: jest.Mock = jest.fn();
  const mockGetCurrentState: jest.Mock = jest.fn();
  const mockVerifyLUBWData: jest.Mock = jest.fn().mockReturnValue(lubwData);
  const mockMeasurandCompleteIntentHandler: jest.Mock = jest.fn();
  const mockFindIntentHandler: jest.Mock = jest.fn().mockReturnValue(mockMeasurandCompleteIntentHandler);
  const mockHandleVerificationError: jest.Mock = jest.fn();
  const mockHandleNoIntentHandlerError: jest.Mock = jest.fn();
  const mockHandleDefaultError: jest.Mock = jest.fn();

  beforeEach(() => {
    (startQanaryPipeline as jest.Mock) = mockStartQanaryPipeline;
    (AnnotationExtractionService.extractAllAnnotations as jest.Mock) = mockExtractAllAnnotations;
    (StoringService.storeCurrentState as jest.Mock) = mockStoreData;
    (StoringService.getCurrentState as jest.Mock) = mockGetCurrentState;
    (LUBWDataTransformationService.getTransformedLUBWData as jest.Mock) = mockGetTransformedLUBWData;
    (VerificationService.verifyLUBWData as jest.Mock) = mockVerifyLUBWData;
    (IntentHandlerFindingService.findIntentHandlerByIntent as jest.Mock) = mockFindIntentHandler;
    (ErrorHandlingService.handleVerificationError as jest.Mock) = mockHandleVerificationError;
    (ErrorHandlingService.handleNoIntentHandlerError as jest.Mock) = mockHandleNoIntentHandlerError;
    (ErrorHandlingService.handleDefaultError as jest.Mock) = mockHandleDefaultError;
  });

  afterEach(() => jest.clearAllMocks());

  describe("Qanary Pipeline", () => {
    it("should start the qanary pipeline with given question", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(text, expect.any(Array));
    });

    it("should start the qanary pipeline with correct components", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([
          COMPONENT.PATTERN_MATCHING_STATION,
          COMPONENT.PATTERN_MATCHING_MEASURAND,
          COMPONENT.PATTERN_MATCHING_CALCULATION,
          COMPONENT.PATTERN_MATCHING_REPRESENTATION,
          COMPONENT.LANGUAGE_RECOGNITION,
          COMPONENT.TIME_RECOGNITION,
          COMPONENT.NER_AUTOML,
          COMPONENT.FUZZY_NER,
        ]),
      );
    });
  });

  describe("Annotation Extraction", () => {
    it("should extract all annotation", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockExtractAllAnnotations).toHaveBeenCalledWith(qanaryMessage);
    });
  });

  describe("Transformation", () => {
    it("should transform the annotations", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockGetTransformedLUBWData).toHaveBeenCalledWith(expect.arrayContaining(annotations), expect.any(Boolean));
    });
  });

  describe("Storing", () => {
    it("should store the current data and intent", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockStoreData).toHaveBeenCalledWith({
        senderId: expect.any(String),
        intent: expect.any(String),
        lubwData: expect.objectContaining(lubwData as unknown as Record<string, string>),
      });
    });
  });

  describe("Verification", () => {
    it("should call the verification service with the lubwData", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockVerifyLUBWData).toHaveBeenCalledWith(
        expect.objectContaining(lubwData as unknown as Record<string, string>),
      );
    });
  });

  describe("Intent Handling", () => {
    it("should find the correct intent handler", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockFindIntentHandler).toHaveBeenCalledWith(intent);
    });

    it("should call the intent handler with the correct data", async () => {
      await abstractRequestHandler(req, res, {});

      expect(mockMeasurandCompleteIntentHandler).toHaveBeenCalledWith(lubwData);
    });
  });

  describe("Error Handling", () => {
    it("should handle Verifications errors accordingly", async () => {
      const verificationError = new VerificationError("Error", null, ILUBWDataKey.Station);
      mockVerifyLUBWData.mockImplementation(() => {
        throw verificationError;
      });

      await abstractRequestHandler(req, res, {});

      expect(mockHandleVerificationError).toHaveBeenCalledWith(res, verificationError);
    });

    it("should handle no intent handler errors accordingly", async () => {
      mockVerifyLUBWData.mockReset();

      const noIntentHandlerError = new NoIntentHandlerError("Error");
      mockFindIntentHandler.mockImplementation(() => {
        throw noIntentHandlerError;
      });

      await abstractRequestHandler(req, res, {});

      expect(mockHandleNoIntentHandlerError).toHaveBeenCalledWith(res);
    });

    it("should handle unexpected errors accordingly", async () => {
      mockStartQanaryPipeline.mockRejectedValue(new Error("Error"));

      await abstractRequestHandler(req, res, {});

      expect(mockHandleDefaultError).toHaveBeenCalledWith(res);
    });
  });
});
