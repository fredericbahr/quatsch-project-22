import { IRepresentationData, REPRESENTATION_TYPE } from "shared";

import { getResponseForMeasurandAir } from "../../utils/get-response";

describe("Get Response Util", () => {
  describe("text representation", () => {
    it("should return a text response", () => {
      const representation: IRepresentationData = {
        type: REPRESENTATION_TYPE.Text,
        value: "test",
      };

      const response = getResponseForMeasurandAir(representation);

      expect(response).toEqual({
        responses: [
          {
            text: "test",
            response: "",
          },
        ],
      });
    });
  });

  describe("graph representation", () => {
    it("should return a graph response", () => {
      const representation: IRepresentationData = {
        type: REPRESENTATION_TYPE.Graph,
        value: "test",
      };

      const response = getResponseForMeasurandAir(representation);

      expect(response).toEqual({
        responses: [
          {
            image: "test",
            response: "",
          },
        ],
      });
    });
  });

  describe("table representation", () => {
    it("should return a table response", () => {
      const representation: IRepresentationData = {
        type: REPRESENTATION_TYPE.Table,
        value: "test",
      };

      const response = getResponseForMeasurandAir(representation);

      expect(response).toEqual({
        responses: [
          {
            image: "test",
            response: "",
          },
        ],
      });
    });
  });
});
