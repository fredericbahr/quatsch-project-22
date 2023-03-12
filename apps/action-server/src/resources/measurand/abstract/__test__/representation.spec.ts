import { ILUBWMeasurandData, REPRESENTATION_TYPE } from "shared";
import { CALCULATION_TYPE } from "shared";

import { AbstractRepresentation } from "../abstract.representation";

describe("Representation Service", () => {
  const measurandData: ILUBWMeasurandData = {
    measurand: "luqx",
    station: "DEBW0081",
    calculation: CALCULATION_TYPE.Average,
    time: '{start: "2023-02-21T00:00:00.000Z", end: "2023-02-21T23:59:59.999Z"}',
    measurandData: [
      {
        values: [1],
        times: [1677014666328],
      },
    ],
    representation: REPRESENTATION_TYPE.Text,
  };

  describe("getRepresentation", () => {
    it("should get a textual representation", () => {
      const representation = AbstractRepresentation.getRepresentation(measurandData);

      expect(representation).toEqual({
        value: "Der average-Wert der Messart luqx für die Station DEBW0081 beträgt am 21.02.2023: 1",
        type: REPRESENTATION_TYPE.Text,
      });
    });

    it("should get a chart representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Graph;

      const representation = AbstractRepresentation.getRepresentation(measurandData);

      expect(representation).toEqual({
        value: new URL(
          `https://quickchart.io/chart?c=${JSON.stringify({
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
                text: "Messart luqx für die Station DEBW0081",
              },
            },
          })}`,
        ),
        type: REPRESENTATION_TYPE.Graph,
      });
    });

    it("should get a table representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Table;

      const representation = AbstractRepresentation.getRepresentation(measurandData);

      expect(representation).toEqual({
        value: new URL(
          `https://api.quickchart.io/v1/table?data=${JSON.stringify({
            title: `Messart ${measurandData.measurand} für die Station ${measurandData.station}`,
            columns: [
              {
                title: "Datum",
                dataIndex: "time",
              },
              {
                title: "Wert",
                dataIndex: "value",
              },
            ],
            dataSource: [
              "-",
              {
                time: "21.02.2023",
                value: 1,
              },
            ],
          })}`,
        ),
        type: REPRESENTATION_TYPE.Table,
      });
    });
  });

  describe("getTextualRepresentation", () => {
    it("should get a textual representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Text;
      const representation = AbstractRepresentation.getTextualRepresentation(measurandData);

      expect(representation).toEqual({
        value: "Der average-Wert der Messart luqx für die Station DEBW0081 beträgt am 21.02.2023: 1",
        type: REPRESENTATION_TYPE.Text,
      });
    });
  });

  describe("getChartRepresentation", () => {
    it("should get a chart representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Graph;
      const representation = AbstractRepresentation.getChartRepresentation(measurandData);

      expect(representation).toEqual({
        value: new URL(
          `https://quickchart.io/chart?c=${JSON.stringify({
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
                text: "Messart luqx für die Station DEBW0081",
              },
            },
          })}`,
        ),
        type: REPRESENTATION_TYPE.Graph,
      });
    });
  });

  describe("getTableRepresentation", () => {
    it("should get a table representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Table;
      const representation = AbstractRepresentation.getTableRepresentation(measurandData);

      expect(representation).toEqual({
        value: new URL(
          `https://api.quickchart.io/v1/table?data=${JSON.stringify({
            title: `Messart ${measurandData.measurand} für die Station ${measurandData.station}`,
            columns: [
              {
                title: "Datum",
                dataIndex: "time",
              },
              {
                title: "Wert",
                dataIndex: "value",
              },
            ],
            dataSource: [
              "-",
              {
                time: "21.02.2023",
                value: 1,
              },
            ],
          })}`,
        ),
        type: REPRESENTATION_TYPE.Table,
      });
    });
  });
});
