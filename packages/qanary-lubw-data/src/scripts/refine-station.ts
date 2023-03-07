import fs from "fs";
import path from "path";

import { stations } from "../data/stations";
import { IStation } from "../interfaces/station";

const createRefineStation = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "../../../../apps/rasa/data/nlu/refine-station.yml"));

  writeStream.write("# Automatically generated file. Do not change the content\n");

  writeStream.write('version: "3.1"\n\n');

  writeStream.write("nlu:\n");
  writeStream.write("  # Refine intent for giving information about a station\n");
  writeStream.write("  - intent: refine_station\n");
  writeStream.write("    examples: |\n");

  stations.forEach((station: IStation) => {
    const { id, label } = station;

    writeStream.write(`      - ${id}\n`);
    writeStream.write(`      - ${label}\n`);

    writeStream.write(`      - Ich interessiere mich für die Station ${id}\n`);
    writeStream.write(`      - Ich interessiere mich für die Station ${label}\n`);

    writeStream.write(`      - Die Station ist ${id}\n`);
    writeStream.write(`      - Die Station ist ${label}\n`);

    writeStream.write(`      - Nimm die Station ${id}\n`);
    writeStream.write(`      - Nimm die Station ${label}\n`);

    writeStream.write(`      - Wähle die Station ${id}\n`);
    writeStream.write(`      - Wähle die Station ${label}\n`);
  });
};

createRefineStation();
