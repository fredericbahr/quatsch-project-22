import { CALCULATION_TYPE, ILUBWMeasurandData, REPRESENTATION_TYPE } from "shared";

import { RepresentationServiceThreshold } from "../treshold.representation";

describe("Threshold Representation Service", () => {
  let measurandData: ILUBWMeasurandData = {
    measurand: "luqx",
    station: "DEBW081",
    calculation: CALCULATION_TYPE.Average,
    time: {
      start: new Date("2023-02-21T00:00:00.000Z"),
      end: new Date("2023-02-21T23:59:59.999Z"),
    },
    measurandData: [
      {
        values: [1],
        times: [1677014666328],
      },
    ],
    representation: REPRESENTATION_TYPE.Text,
  };

  const mockStringify = jest.fn();

  beforeEach(() => {
    (JSON.stringify as unknown as jest.Mock) = mockStringify;
  });

  describe("getRepresentation", () => {
    it("should get a textual representation", () => {
      const representation = RepresentationServiceThreshold.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Text,
        }),
      );
    });

    it("should get a chart representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Graph;

      const representation = RepresentationServiceThreshold.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Graph,
        }),
      );
    });

    it("should get a table representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Table;

      const representation = RepresentationServiceThreshold.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Table,
        }),
      );
    });
  });

  describe("getTextualRepresentation", () => {
    it("should get the correct textual representation if no threshold is defined", () => {
      const representation = RepresentationServiceThreshold.getTextualRepresentation(measurandData);

      expect(representation).toEqual({
        value: expect.stringContaining("Es liegen keine Grenzwerte für die Messart"),
        type: REPRESENTATION_TYPE.Text,
      });
    });

    it("should get the correct textual representation if one threshold is defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "no2",
      };

      const representation = RepresentationServiceThreshold.getTextualRepresentation(measurandData);

      expect(representation).toEqual({
        value: expect.stringContaining("Der Grenzwert für die Messart"),
        type: REPRESENTATION_TYPE.Text,
      });
    });

    it("should get the correct textual representation if multiple thresholds are defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "o3",
      };

      const representation = RepresentationServiceThreshold.getTextualRepresentation(measurandData);

      expect(representation).toEqual({
        value: expect.stringContaining("Der Grenzwert 1 für die Messart"),
        type: REPRESENTATION_TYPE.Text,
      });
      expect(representation).toEqual({
        value: expect.stringContaining("Der Grenzwert 2 für die Messart"),
        type: REPRESENTATION_TYPE.Text,
      });
    });
  });

  describe("getChartRepresentation", () => {
    it("should get the correct chart representation if threshold is not defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "luqx",
        representation: REPRESENTATION_TYPE.Graph,
      };

      RepresentationServiceThreshold.getChartRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        type: "line",
        data: {
          labels: ["21.02.2023"],
          datasets: [
            {
              label: "luqx",
              data: [1],
              fill: false,
              borderColor: "green",
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: expect.stringContaining("Grenzwert"),
          },
        },
      });
    });

    it("should get the correct chart representation if one threshold is defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "no2",
        representation: REPRESENTATION_TYPE.Graph,
      };

      RepresentationServiceThreshold.getChartRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        type: "line",
        data: {
          labels: ["21.02.2023"],
          datasets: [
            {
              label: "no2",
              data: [1],
              fill: false,
              borderColor: "green",
            },
            {
              label: expect.stringContaining("Grenzwert"),
              data: expect.arrayContaining([200]),
              fill: false,
              borderColor: expect.any(String),
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: expect.stringContaining("Grenzwert"),
          },
        },
      });
    });

    it("should get the correct chart representation if multiple thresholds are defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "o3",
        representation: REPRESENTATION_TYPE.Graph,
      };

      RepresentationServiceThreshold.getChartRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        type: "line",
        data: {
          labels: ["21.02.2023"],
          datasets: [
            {
              label: "o3",
              data: [1],
              fill: false,
              borderColor: "green",
            },
            {
              label: expect.stringContaining("Grenzwert 1"),
              data: expect.arrayContaining([expect.any(Number)]),
              fill: false,
              borderColor: expect.any(String),
            },
            {
              label: expect.stringContaining("Grenzwert 2"),
              data: expect.arrayContaining([expect.any(Number)]),
              fill: false,
              borderColor: expect.any(String),
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: expect.stringContaining("Grenzwert"),
          },
        },
      });
    });
  });

  describe("getTableRepresentation", () => {
    it("should get the correct table representation if no threshold is defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "luqx",
        representation: REPRESENTATION_TYPE.Table,
      };

      RepresentationServiceThreshold.getTableRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        title: expect.stringContaining("mit Grenzwerten"),
        columns: [
          {
            title: "Datum",
            dataIndex: "time",
          },
          {
            title: "Wert",
            dataIndex: "value",
            align: "center",
          },
        ],
        dataSource: [
          "-",
          {
            time: "21.02.2023",
            value: 1,
          },
        ],
      });
    });

    it("should get the correct table representation if one threshold is defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "no2",
        representation: REPRESENTATION_TYPE.Table,
      };

      RepresentationServiceThreshold.getTableRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        title: expect.stringContaining("mit Grenzwerten"),
        columns: [
          {
            title: "Datum",
            dataIndex: "time",
          },
          {
            title: "Wert",
            dataIndex: "value",
            align: "center",
          },
          {
            title: "Grenzwert 1",
            dataIndex: "threshold1",
            align: "center",
          },
        ],
        dataSource: [
          "-",
          {
            time: "21.02.2023",
            value: 1,
            threshold1: expect.any(Number),
          },
        ],
      });
    });

    it("should get the correct table representation if multiple thresholds are defined", () => {
      measurandData = {
        ...measurandData,
        measurand: "o3",
        representation: REPRESENTATION_TYPE.Table,
      };

      RepresentationServiceThreshold.getTableRepresentation(measurandData);

      expect(mockStringify).toHaveBeenCalledWith({
        title: expect.stringContaining("mit Grenzwerten"),
        columns: [
          {
            title: "Datum",
            dataIndex: "time",
          },
          {
            title: "Wert",
            dataIndex: "value",
            align: "center",
          },
          {
            title: "Grenzwert 1",
            dataIndex: "threshold1",
            align: "center",
          },
          {
            title: "Grenzwert 2",
            dataIndex: "threshold2",
            align: "center",
          },
        ],
        dataSource: [
          "-",
          {
            time: "21.02.2023",
            value: 1,
            threshold1: expect.any(Number),
            threshold2: expect.any(Number),
          },
        ],
      });
    });
  });
});
