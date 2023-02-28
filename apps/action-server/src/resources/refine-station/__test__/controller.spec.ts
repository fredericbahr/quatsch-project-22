import {
  AnnotationTypes,
  ILUBWData,
  ILUBWDataKey,
  IQanaryAnnotation,
  IQanaryMessage,
  RasaRequest,
  RasaResponse,
} from "shared";

import { NoIntentHandlerError } from "../../../errors/NoIntentHandlerError";
import { VerificationError } from "../../../errors/VerificationError";
import { ErrorHandlingService } from "../../../services/error-handling-service";
import { AnnotationExtractionService } from "../../../services/extraction-service/extract-annotation-service";
import { IntentHandlerFindingService } from "../../../services/intent-handler-finding-service";
import { StoringService } from "../../../services/storing-service";
import { LUBWDataTransformationService } from "../../../services/transformation-service";
import { VerificationService } from "../../../services/verification-service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { startQanaryPipeline } from "../../../utils/start-pipeline";
import { refineStationRequestHandler } from "../refine-station.controller";

jest.mock("../../../utils/start-pipeline", () => ({
  startQanaryPipeline: jest.fn(),
}));

jest.mock("../../../services/extraction-service/extract-annotation-service", () => ({
  AnnotationExtractionService: {
    extractAllAnnotations: jest.fn(() => []),
    extractAnnotationsByType: jest.fn(() => []),
  },
}));

jest.mock("../../../services/storing-service", () => ({
  StoringService: {
    changeStateEntry: jest.fn(),
    storeCurrentState: jest.fn(),
  },
}));

jest.mock("../../../services/verification-service", () => ({
  VerificationService: {
    verifyLUBWData: jest.fn(),
  },
}));

jest.mock("../../../services/intent-handler-finding-service", () => ({
  IntentHandlerFindingService: {
    findIntentHandlerByIntent: jest.fn(),
    findIntentHandlerInState: jest.fn(),
  },
}));

jest.mock("../../../services/error-handling-service", () => ({
  ErrorHandlingService: {
    handleNoIntentHandlerError: jest.fn(),
    handleVerificationError: jest.fn(),
    handleDefaultError: jest.fn(),
  },
}));

describe("#Refine Station controllers", () => {
  const senderId = "test-sender-id";
  const text = "Ich bin der Test-Text";
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  const annotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "DEBW0081",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:station-pattern-matching>",
      score: 1,
    },
  ];
  const lubwData: Partial<ILUBWData> = {
    calculation: undefined,
    measurand: undefined,
    station: "DEBW0081",
    time: undefined,
    representation: undefined,
  };
  const state: Partial<ILUBWData> = {
    calculation: "average",
    measurand: "o3",
    station: "DEBW0081",
    time: "1d",
    representation: "text",
  };

  const req: RasaRequest = {
    body: { sender_id: senderId, tracker: { latest_message: { text } } },
  } as RasaRequest;
  const res: RasaResponse = { status: jest.fn(), end: jest.fn(), json: jest.fn() } as unknown as RasaResponse;

  const mockStartQanaryPipeline: jest.Mock = jest.fn().mockResolvedValue(qanaryMessage);
  const mockExtractAnnotationsByType: jest.Mock = jest.fn().mockResolvedValue(annotations);
  const mockGetTransformedLUBWData: jest.Mock = jest.fn().mockReturnValue(lubwData);
  const mockChangeStateEntry: jest.Mock = jest.fn();
  const mockGetCurrentState: jest.Mock = jest.fn().mockResolvedValue(state);
  const mockVerifyLUBWData: jest.Mock = jest.fn().mockReturnValue(state);
  const mockIntentHandler: jest.Mock = jest.fn();
  const mockFindIntentHandlerInState: jest.Mock = jest.fn().mockReturnValue(mockIntentHandler);
  const mockHandleVerificationError: jest.Mock = jest.fn();
  const mockHandleNoIntentHandlerError: jest.Mock = jest.fn();
  const mockHandleDefaultError: jest.Mock = jest.fn();

  beforeEach(() => {
    (startQanaryPipeline as jest.Mock) = mockStartQanaryPipeline;
    (AnnotationExtractionService.extractAnnotationsByType as jest.Mock) = mockExtractAnnotationsByType;
    (LUBWDataTransformationService.getTransformedLUBWData as jest.Mock) = mockGetTransformedLUBWData;
    (StoringService.changeStateEntry as jest.Mock) = mockChangeStateEntry;
    (StoringService.getCurrentState as jest.Mock) = mockGetCurrentState;
    (VerificationService.verifyLUBWData as jest.Mock) = mockVerifyLUBWData;
    (IntentHandlerFindingService.findIntentHandlerInState as jest.Mock) = mockFindIntentHandlerInState;
    (ErrorHandlingService.handleVerificationError as jest.Mock) = mockHandleVerificationError;
    (ErrorHandlingService.handleNoIntentHandlerError as jest.Mock) = mockHandleNoIntentHandlerError;
    (ErrorHandlingService.handleDefaultError as jest.Mock) = mockHandleDefaultError;
  });

  afterEach(() => jest.clearAllMocks());

  describe("Qanary Pipeline", () => {
    it("should start the qanary pipeline with given question", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(text, expect.any(Array));
    });

    it("should start the qanary pipeline with correct components", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockStartQanaryPipeline).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining(["qanary-component-pm-station"]),
      );
    });
  });

  describe("Annotation Extraction", () => {
    it("should extract measurand annotation", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockExtractAnnotationsByType).toHaveBeenCalledWith(qanaryMessage, AnnotationTypes.Station);
    });
  });

  describe("Transformation", () => {
    it("should transform the annotations", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockGetTransformedLUBWData).toHaveBeenCalledWith(expect.objectContaining(annotations), false);
    });
  });

  describe("Storing", () => {
    it("should store the measurand", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockChangeStateEntry).toHaveBeenCalledWith(expect.any(String), ILUBWDataKey.Station, expect.any(String));
    });

    it("should get the current state", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockGetCurrentState).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("Verification", () => {
    it("should call the verification service with the lubwData", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockVerifyLUBWData).toHaveBeenCalledWith(expect.objectContaining(state));
    });
  });

  describe("Intent Handling", () => {
    it("should find the correct intent handler", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockFindIntentHandlerInState).toHaveBeenCalledWith(senderId);
    });

    it("should call the intent handler with the correct data", async () => {
      await refineStationRequestHandler(req, res);

      expect(mockIntentHandler).toHaveBeenCalledWith(state);
    });
  });

  describe("Error Handling", () => {
    it("should handle Verifications errors occordingly", async () => {
      const verificationErrror = new VerificationError("Error", null, ILUBWDataKey.Station);
      mockVerifyLUBWData.mockImplementation(() => {
        throw verificationErrror;
      });

      await refineStationRequestHandler(req, res);

      expect(mockHandleVerificationError).toHaveBeenCalledWith(res, verificationErrror);
    });

    it("should handle no intent handler errors occordingly", async () => {
      mockVerifyLUBWData.mockReset();

      const noIntentHandlerError = new NoIntentHandlerError("Error");
      mockFindIntentHandlerInState.mockImplementation(() => {
        throw noIntentHandlerError;
      });

      await refineStationRequestHandler(req, res);

      expect(mockHandleNoIntentHandlerError).toHaveBeenCalledWith(res);
    });

    it("should handle unexpected errors occordingly", async () => {
      mockStartQanaryPipeline.mockRejectedValue(new Error("Error"));

      await refineStationRequestHandler(req, res);

      expect(mockHandleDefaultError).toHaveBeenCalledWith(res);
    });
  });
});
