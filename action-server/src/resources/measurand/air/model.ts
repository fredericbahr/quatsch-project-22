export enum Measurand {
  None = "",
  LUGX = "luqx",
  NO2 = "no2",
  O3 = "o3",
  PM10 = "pm10",
  PM25K = "pm25k",
}

export interface IMeasurand {
  label: string;
  id: Measurand;
}

export const measurandAirModel: Record<string, IMeasurand> = {
  [Measurand.None]: { label: "", id: Measurand.None },
  [Measurand.LUGX]: { label: "Luftqualitätsindex (LQI BW)", id: Measurand.LUGX },
  [Measurand.NO2]: { label: "Stickstoffdioxid (NO₂)", id: Measurand.NO2 },
  [Measurand.O3]: { label: "Ozon (O₃)", id: Measurand.O3 },
  [Measurand.PM10]: { label: "Feinstaub PM10 (kontinuierlich)", id: Measurand.PM10 },
  [Measurand.PM25K]: { label: "Feinstaub PM2,5 (kontinuierlich)", id: Measurand.PM25K },
};
