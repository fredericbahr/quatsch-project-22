import { ILUBWData, IState } from "shared";

import { mergeStateAndLubwData } from "../merge-state-lubw-data";

describe("mergeStateAndLubwData", () => {
  const defaultState: IState = {
    station: "station-state",
    measurand: "measurand-state",
    calculation: "calculation-state" as any,
    representation: "representation-state" as any,
    time: {
      start: new Date("2023-02-21T00:00:00.000Z"),
      end: new Date("2023-02-21T23:59:59.999Z"),
    },
  };
  const defaultLubwData: Partial<ILUBWData> = {
    station: "station-lubw",
    measurand: "measurand-lubw",
    calculation: "calculation-lubw" as any,
    representation: "representation-lubw" as any,
    time: {
      start: new Date("2023-02-21T00:00:00.000Z"),
      end: new Date("2023-02-21T23:59:59.999Z"),
    },
  };

  it("should merge the state and the lubwData and keep lubw data", () => {
    const result = mergeStateAndLubwData(defaultState, defaultLubwData);
    expect(result).toEqual(defaultLubwData);
  });

  it("should merge the state and the lubwData and keep state data if lubw data is undefined", () => {
    const result = mergeStateAndLubwData(defaultState, {});
    expect(result).toEqual(defaultState);
  });

  it("should merge the state and the lubwData and keep state data if lubw data is partial undefined", () => {
    const lubwData = {
      ...defaultLubwData,
      station: undefined,
      representation: undefined,
    };

    const result = mergeStateAndLubwData(defaultState, lubwData);
    expect(result).toEqual({
      station: defaultState.station,
      measurand: lubwData.measurand,
      calculation: lubwData.calculation,
      representation: defaultState.representation,
      time: lubwData.time,
    });
  });

  it("should return undefined if state and lubwData are undefined", () => {
    const state = {
      ...defaultState,
      station: undefined,
    };

    const lubwData = {
      ...defaultLubwData,
      station: undefined,
    };

    const result = mergeStateAndLubwData(state, lubwData);
    expect(result).toEqual({
      station: undefined,
      measurand: lubwData.measurand,
      calculation: lubwData.calculation,
      representation: lubwData.representation,
      time: lubwData.time,
    });
  });
});
