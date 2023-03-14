import { ILupoAirMetric } from "api/dist/lupo-cloud";
import { CALCULATION_TYPE, ILUBWData, ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { LUBWQueryService } from "../../../../services/lubw-query-service";
import { ResponseService } from "../../../../services/response-service";
import { thresholdIntentHandler } from "../threshold.intent-handler";
import { RepresentationServiceThreshold } from "../treshold.representation";

jest.mock("../../../../services/lubw-query-service", () => ({
  LUBWQueryService: {
    queryLUBWAPI: jest.fn(),
  },
}));

jest.mock("../treshold.representation", () => ({
  RepresentationServiceThreshold: {
    getRepresentation: jest.fn(),
  },
}));

jest.mock("../../../../services/response-service", () => ({
  ResponseService: {
    getResponseByRepresentation: jest.fn(),
  },
}));

describe("Measurand Threshold Intent Handler", () => {
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
  const measurandData: ILUBWMeasurandData = {
    ...lubwData,
    measurandData: [
      {
        metric: ILupoAirMetric.Luqx,
        labels: {},
        metaData: {},
        times: [1677003319],
        values: [2.0],
      },
    ],
  };
  const representation: IRepresentationData = {
    value: "Der Messwert ist extrem.",
    type: REPRESENTATION_TYPE.Text,
  };

  const mockQueryLUBWAPI: jest.Mock = jest.fn().mockResolvedValue(measurandData);
  const mockGetRepresentation: jest.Mock = jest.fn().mockReturnValue(representation);
  const mockGetResponseByRepresentation: jest.Mock = jest.fn();

  beforeEach(() => {
    (LUBWQueryService.queryLUBWAPI as jest.Mock) = mockQueryLUBWAPI;
    (RepresentationServiceThreshold.getRepresentation as jest.Mock) = mockGetRepresentation;
    (ResponseService.getResponseByRepresentation as jest.Mock) = mockGetResponseByRepresentation;
  });

  describe("LUBW API Query", () => {
    it("should call the LUBW API with the correct data", async () => {
      await thresholdIntentHandler(lubwData);

      expect(mockQueryLUBWAPI).toHaveBeenCalledWith(lubwData);
    });
  });

  describe("Representation Service", () => {
    it("should call the Threshold Representation Service with the correct data", async () => {
      await thresholdIntentHandler(lubwData);

      expect(mockGetRepresentation).toHaveBeenCalledWith(measurandData);
    });
  });

  describe("Response", () => {
    it("should call the response service with the correct data", async () => {
      await thresholdIntentHandler(lubwData);

      expect(mockGetResponseByRepresentation).toHaveBeenCalledWith(representation);
    });
  });

  describe("Error Handling", () => {
    it("should throw an error if the LUBW API query fails", async () => {
      mockQueryLUBWAPI.mockRejectedValue(new Error());

      await expect(thresholdIntentHandler(lubwData)).rejects.toThrowError();
    });
  });
});
