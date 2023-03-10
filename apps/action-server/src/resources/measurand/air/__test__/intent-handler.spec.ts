import { ILUBWData, ILUBWMeasurandData, IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { LUBWQueryService } from "../../../../services/lubw-query-service";
import { RepresentationService } from "../../../../services/representation-service";
import { ResponseService } from "../../../../services/response-service";
import { measurandAirIntentHandler } from "../measurand-air.intent-handler";

jest.mock("../../../../services/lubw-query-service", () => ({
  LUBWQueryService: {
    queryLUBWAPI: jest.fn(),
  },
}));

jest.mock("../../../../services/representation-service", () => ({
  RepresentationService: {
    getRepresentation: jest.fn(),
  },
}));

jest.mock("../../../../services/response-service", () => ({
  ResponseService: {
    getResponseByRepresentation: jest.fn(),
  },
}));

describe("Measurand Air Intent Handler", () => {
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
    type: REPRESENTATION_TYPE.Text,
  };

  const mockQueryLUBWAPI: jest.Mock = jest.fn().mockResolvedValue(measurandData);
  const mockGetRepresentation: jest.Mock = jest.fn().mockReturnValue(representation);
  const mockGetResponseByRepresentation: jest.Mock = jest.fn();

  beforeEach(() => {
    (LUBWQueryService.queryLUBWAPI as jest.Mock) = mockQueryLUBWAPI;
    (RepresentationService.getRepresentation as jest.Mock) = mockGetRepresentation;
    (ResponseService.getResponseByRepresentation as jest.Mock) = mockGetResponseByRepresentation;
  });

  describe("LUBW API Query", () => {
    it("should call the LUBW API with the correct data", async () => {
      await measurandAirIntentHandler(lubwData);

      expect(mockQueryLUBWAPI).toHaveBeenCalledWith(lubwData);
    });
  });

  describe("Representation Service", () => {
    it("should call the Representation Service with the correct data", async () => {
      await measurandAirIntentHandler(lubwData);

      expect(mockGetRepresentation).toHaveBeenCalledWith(measurandData);
    });
  });

  describe("Response", () => {
    it("should call the response utils with the correct data", async () => {
      await measurandAirIntentHandler(lubwData);

      expect(mockGetResponseByRepresentation).toHaveBeenCalledWith(representation);
    });
  });

  describe("Error Handling", () => {
    it("should throw an error if the LUBW API query fails", async () => {
      mockQueryLUBWAPI.mockRejectedValue(new Error());

      await expect(measurandAirIntentHandler(lubwData)).rejects.toThrowError();
    });
  });
});
