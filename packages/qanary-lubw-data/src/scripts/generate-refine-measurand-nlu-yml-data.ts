import fs from "fs";
import path from "path";

import { measurands } from "../data/measurands";

const createRefineMeasurandNLU = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "../../../../apps/rasa/data/nlu/refine-measurand.yml"));

  writeStream.write("# Automatically generated file. Do not change the content\n");

  writeStream.write('version: "3.1"\n\n');

  writeStream.write("nlu:\n");
  writeStream.write("  # Refine intent for giving information about a measurand\n");
  writeStream.write("  - intent: refine_measurand\n");
  writeStream.write("    examples: |\n");

  measurands.forEach((measurands) => {
    const { id, label } = measurands;

    writeStream.write(`      - ${id}\n`);
    writeStream.write(`      - ${label}\n`);

    writeStream.write(`      - Ich interessiere mich für die Messart ${id}\n`);
    writeStream.write(`      - Ich interessiere mich für die Messart ${label}\n`);

    writeStream.write(`      - Die Messart ist ${id}\n`);
    writeStream.write(`      - Die Messart ist ${label}\n`);

    writeStream.write(`      - Nimm die Messart ${id}\n`);
    writeStream.write(`      - Nimm die Messart ${label}\n`);

    writeStream.write(`      - Wähle die Messart ${id}\n`);
    writeStream.write(`      - Wähle die Messart ${label}\n`);
  });
};

createRefineMeasurandNLU();
