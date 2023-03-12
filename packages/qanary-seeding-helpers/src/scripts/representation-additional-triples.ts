import fs from "fs";
import path from "path";
import { representations } from "qanary-lubw-data";
import { Domain } from "shared";

import { getClassDefinitions, getPrefixes, getRepresentationTriples } from "../seeding-helpers";

const createRepresentationAdditionalTriples = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "./data/representation-additional-triples.rq"));

  const stationAdditioanlTriples = `${getPrefixes()}
${getClassDefinitions(Object.values(Domain))}
${getRepresentationTriples(representations)}`;

  writeStream.write(stationAdditioanlTriples);
};

createRepresentationAdditionalTriples();
