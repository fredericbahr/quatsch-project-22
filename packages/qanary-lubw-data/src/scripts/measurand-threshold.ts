import fs from "fs";
import path from "path";

import { measurands } from "../data/measurands";
import { stations } from "../data/stations";
import { IMeasurand } from "../interfaces/measurand";
import { IStation } from "../interfaces/station";

const createMeasurandThresholdNLU = () => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, "../../../../apps/rasa/data/nlu/measurand-threshold.yml"),
  );

  writeStream.write("# Automatically generated file. Do not change the content\n");

  writeStream.write('version: "3.1"\n\n');

  writeStream.write("nlu:\n");
  writeStream.write("  # Threshhold intent for giving information about measurand exceeding a threshold\n");
  writeStream.write("  - intent: measurand_threshold\n");
  writeStream.write("    examples: |\n");

  // follow up questions
  writeStream.write(`      - Ist der Messwert extrem?\n`);
  writeStream.write(`      - Ist der Messwert gefährlich?\n`);
  writeStream.write(`      - Ist der Messwert grenzwertig?\n`);
  writeStream.write(`      - Liegt der Messwert über einem Grenzwert?\n`);
  writeStream.write(`      - Ist der Wert extrem?\n`);
  writeStream.write(`      - Ist der Wert gefährlich?\n`);
  writeStream.write(`      - Liegt der Wert über einem Grenzwert?\n`);

  writeStream.write("\n");

  // starting questions with measurand, station and time range
  measurands.forEach((measurands: IMeasurand) => {
    stations.forEach((station: IStation, index: number) => {
      const startDate = "23.03.2021";
      const endDate = "23.05.2021";
      const { id: measurandId, label: measurandLabel } = measurands;
      const { id: stationId, label: stationLabel } = station;

      if (index === 0) {
        writeStream.write(`      - Ist der ${measurandId}wert für die Station ${stationId} grenzwertig?\n`);
        writeStream.write(`      - Ist der ${measurandId}wert für die Station ${stationId} extrem?\n`);
        writeStream.write(`      - Ist der ${measurandId}wert für die Station ${stationId} gefährlich?\n`);
      }

      if (index === 0) {
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} grenzwertig ausgegeben als Graph?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} extrem ausgegeben als Graph?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} gefährlich ausgegeben als Graph?\n`,
        );

        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} grenzwertig ausgegeben als Tabelle?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} extrem ausgegeben als Tabelle?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} gefährlich ausgegeben als Tabelle?\n`,
        );
      }

      writeStream.write(`      - Ist der ${measurandLabel}wert für die Station ${stationLabel} grenzwertig?\n`);
      writeStream.write(`      - Ist der ${measurandLabel}wert für die Station ${stationLabel} extrem?\n`);
      if (index === 0) {
        writeStream.write(`      - Ist der ${measurandLabel}wert für die Station ${stationLabel} gefährlich?\n`);
      }

      if (index < 15) {
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} zwischen dem ${startDate} und ${endDate} grenzwertig?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} zwischen dem ${startDate} und ${endDate} extrem?\n`,
        );
        writeStream.write(
          `      - Ist der ${measurandLabel}wert für die Station ${stationLabel} zwischen dem ${startDate} und ${endDate} gefährlich?\n`,
        );
      }
    });
  });
};

createMeasurandThresholdNLU();
