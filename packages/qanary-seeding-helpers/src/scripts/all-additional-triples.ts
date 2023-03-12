import fs from "fs";
import path from "path";
import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { Domain } from "shared";

import { generateAdditionalTriples } from "../seeding-helpers";

const createAllAdditionalTriples = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "./data/all-additional-triples.rq"));

  const allAdditioanlTriples = `${generateAdditionalTriples({
    domains: Object.values(Domain),
    stations,
    measurands,
    calculations,
    representations,
  })}`;

  writeStream.write(allAdditioanlTriples);
};

createAllAdditionalTriples();
