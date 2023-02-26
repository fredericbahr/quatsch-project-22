import { LupoCloudApi } from "api";
import { ILUBWData, ILUBWMeasurandData } from "shared";

/**
 * Service for querying the LUBW API.
 */
export class LUBWQueryService {
  /**
   * Queries the LUBW API with the given annotations.
   * @returns the data queried from the LUBW API
   * @param lubwData
   */
  public static async queryLUBWAPI(lubwData: ILUBWData): Promise<ILUBWMeasurandData> {
    // TODO: add error handling
    // TODO: add logic for different calculation types
    try {
      const measurandData = await this.fetchLubwData(lubwData);

      return {
        measurandData,
        ...lubwData,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetch the annotations from LUBW API.
   * @returns the constructed LUBW API URL
   * @param lubwData
   */
  private static async fetchLubwData(lubwData: ILUBWData): Promise<Array<LupoCloudApi.ILupoMeasuringData>> {
    const airMetricAdapter = new Map([
      ["luqx", LupoCloudApi.ILupoAirMetric.Luqx],
      ["no2", LupoCloudApi.ILupoAirMetric.No2],
      ["o3", LupoCloudApi.ILupoAirMetric.O3],
      ["pm10", LupoCloudApi.ILupoAirMetric.Pm10],
      ["pm25k", LupoCloudApi.ILupoAirMetric.Pm25k],
    ]);

    const lubwResonse = await LupoCloudApi.LUPOAirMetricControllerApiFactory().readMetric(
      airMetricAdapter.get(lubwData.measurand) || LupoCloudApi.ILupoAirMetric.O3,
      lubwData.time ? `${lubwData.time}-ago` : undefined,
      undefined,
      lubwData.station ? `station:${lubwData.station}` : undefined,
    );

    return lubwResonse.data;
  }
}
