import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";

const additionalTriples = generateAdditionalTriples({
  stations,
  measurands,
  calculations,
  representations,
});

fetch("http://localhost:40111/startquestionansweringwithtextquestion", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question:
      "Wie ist der Ozonwert in Ulm am 23.01.2023, verglichen mit den Durchschnittswerten der letzten 10 Jahre repräsentiert als Tabelle?",
    componentlist: ["my-components"],
    additionalTriples,
  }),
}).catch(console.error);
