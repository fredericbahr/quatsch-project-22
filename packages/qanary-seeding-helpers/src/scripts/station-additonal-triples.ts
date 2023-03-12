import fs from "fs";
import path from "path";
import { stations } from "qanary-lubw-data";
import { Domain } from "shared";

import { getClassDefinitions, getPrefixes, getStationTriples } from "../seeding-helpers";

const createStationAdditionalTriples = () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "./data/station-additional-triples.rq"));

  const stationAdditioanlTriples = `${getPrefixes()}
${getClassDefinitions(Object.values(Domain))}
${getStationTriples(stations)}`;

  writeStream.write(stationAdditioanlTriples);
};

createStationAdditionalTriples();
