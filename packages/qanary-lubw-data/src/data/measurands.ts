import { IMeasurand } from "../interfaces/measurand";

/** the measurand types of lubw */
export const measurands: IMeasurand[] = [
  {
    id: "luqx",
    label: "Luftqualitätsindex",
  },
  {
    id: "no2",
    label: "Stickstoffdioxid",
    threshold: [200],
  },
  {
    id: "o3",
    label: "Ozon",
    threshold: [180, 240],
  },
  {
    id: "pm10",
    label: "Feinstaub PM10",
    threshold: [50],
  },
  {
    id: "pm25k",
    label: "Feinstaub PM25",
  },
];
