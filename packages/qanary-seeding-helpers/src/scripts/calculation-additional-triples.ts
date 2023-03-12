import fs from "fs";
import path from "path";
import { calculations } from "qanary-lubw-data";
import { Domain } from "shared";

import { getCalculationTriples, getClassDefinitions, getPrefixes } from "../seeding-helpers";

const createCalculationAdditionalTriples = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "./data/calculation-additional-triples.rq"));

  const stationAdditioanlTriples = `${getPrefixes()}
${getClassDefinitions(Object.values(Domain))}
${getCalculationTriples(calculations)}`;

  writeStream.write(stationAdditioanlTriples);
};

createCalculationAdditionalTriples();
