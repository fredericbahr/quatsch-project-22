import fs from "fs";

import { stations } from "../data/stations";

const createFallbackStation = () => {
  const writeStream = fs.createWriteStream("fallback-station.yml");

  stations.forEach((station) => {
    const { id, label } = station;

    writeStream.write(`- ${id}\n`);
    writeStream.write(`- ${label}\n`);

    writeStream.write(`- Ich interessiere mich für die Station ${id}\n`);
    writeStream.write(`- Ich interessiere mich für die Station ${label}\n`);

    writeStream.write(`- Die Station ist ${id}\n`);
    writeStream.write(`- Die Station ist ${label}\n`);

    writeStream.write(`- Nimm die Station ${id}\n`);
    writeStream.write(`- Nimm die Station ${label}\n`);

    writeStream.write(`- Wähle die Station ${id}\n`);
    writeStream.write(`- Wähle die Station ${label}\n`);
  });
};

createFallbackStation();
