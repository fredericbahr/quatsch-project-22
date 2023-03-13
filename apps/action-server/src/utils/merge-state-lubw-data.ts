import { defaultLUBWData, ILUBWData, ILUBWDataKey, IState } from "shared";

/**
 * Merges the state and the lubwData
 * @param state the state
 * @param lubwData the lubwData
 * @returns the merged state and the lubwData
 */
export const mergeStateAndLubwData = (
  state: Partial<IState> | null,
  lubwData: Partial<ILUBWData>,
): Partial<ILUBWData> => {
  return {
    station: lubwData.station || state?.station,
    measurand: lubwData.measurand || state?.measurand,
    calculation: lubwData.calculation || state?.calculation,
    representation: lubwData.representation || state?.representation,
    time: {
      start: lubwData.time?.start || state?.time?.start || defaultLUBWData.time.start,
      end: lubwData.time?.end || state?.time?.end || defaultLUBWData.time.end,
    },
  };
};
