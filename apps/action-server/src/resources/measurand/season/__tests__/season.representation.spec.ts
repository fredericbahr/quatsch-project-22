import { sub } from "date-fns";
import { CALCULATION_TYPE, ILUBWMeasurandData, REPRESENTATION_TYPE } from "shared";

import { RepresentationServiceSeason } from "../season.representation";

describe("Season Representation Service", () => {
  const measurandData: ILUBWMeasurandData = {
    measurand: "luqx",
    station: "DEBW0081",
    calculation: CALCULATION_TYPE.Average,
    time: {
      start: sub(new Date(), { months: 3 }),
      end: new Date(),
    },
    measurandData: [
      {
        values: [1, 2],
        times: [1677014666328, 1677054666328],
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
      const representation = RepresentationServiceSeason.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Text,
        }),
      );
    });

    it("should get a chart representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Graph;

      const representation = RepresentationServiceSeason.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Graph,
        }),
      );
    });

    it("should get a table representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Table;

      const representation = RepresentationServiceSeason.getRepresentation(measurandData);

      expect(representation).toEqual(
        expect.objectContaining({
          type: REPRESENTATION_TYPE.Table,
        }),
      );
    });
  });

  describe("getTextualRepresentation", () => {
    it("should get the correct textual representation", () => {
      const representation = RepresentationServiceSeason.getTextualRepresentation(measurandData);

      expect(representation).toEqual({
        value: expect.stringContaining("beträgt: 2"),
        type: REPRESENTATION_TYPE.Text,
      });

      expect(representation).toEqual({
        value: expect.stringContaining(
          "Der durchschnittliche Wert für die Station DEBW0081 der letzten drei Monate beträgt: 1.5",
        ),
        type: REPRESENTATION_TYPE.Text,
      });
    });
  });

  describe("getChartRepresentation", () => {
    it("should get a chart representation", () => {
      measurandData.representation = REPRESENTATION_TYPE.Graph;
      const representation = RepresentationServiceSeason.getChartRepresentation(measurandData);

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
      const representation = RepresentationServiceSeason.getTableRepresentation(measurandData);

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
