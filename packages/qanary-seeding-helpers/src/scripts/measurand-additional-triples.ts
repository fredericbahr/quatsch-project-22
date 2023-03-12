import fs from "fs";
import path from "path";
import { measurands } from "qanary-lubw-data";
import { Domain } from "shared";

import { getClassDefinitions, getMeasurandTriples, getPrefixes } from "../seeding-helpers";

const createMeasruandAdditionalTriples = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "./data/measurand-additional-triples.rq"));

  const stationAdditioanlTriples = `${getPrefixes()}
${getClassDefinitions(Object.values(Domain))}
${getMeasurandTriples(measurands)}`;

  writeStream.write(stationAdditioanlTriples);
};

createMeasruandAdditionalTriples();
