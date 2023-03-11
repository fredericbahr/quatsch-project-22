import { ILUBWData } from "shared";

import { LUBWQueryService } from "../lubw-query-service";

xdescribe("LUBW Query Service", () => {
  const lubwData: ILUBWData = {
    calculation: "average",
    measurand: "luqx",
    station: "DEBW0081",
    time: "{start: '2021-03-18T13:00:00.000Z'}",
    representation: "text",
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
