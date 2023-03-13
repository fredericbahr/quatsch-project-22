import { ILUBWData, REPRESENTATION_TYPE } from "shared";
import { CALCULATION_TYPE } from "shared";

import { LUBWQueryService } from "../lubw-query-service";

xdescribe("LUBW Query Service", () => {
  const lubwData: ILUBWData = {
    calculation: CALCULATION_TYPE.Average,
    measurand: "luqx",
    station: "DEBW0081",
    time: {
      start: new Date("2023-02-21T00:00:00.000Z"),
      end: new Date("2023-02-21T23:59:59.999Z"),
    },
    representation: REPRESENTATION_TYPE.Text,
  };
  const measurandData = ["measurandData"];

  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(measurandData),
      }),
    );
  });

  it("should query the LUBW API", async () => {
    const data = await LUBWQueryService.queryLUBWAPI(lubwData);

    expect(data).toEqual({
      ...lubwData,
      measurandData,
    });
  });

  it("should throw an error if the query fails", async () => {
    (window.fetch as jest.Mock) = jest.fn(() => Promise.reject("error"));

    await expect(LUBWQueryService.queryLUBWAPI(lubwData)).rejects.toEqual("error");
  });
});
