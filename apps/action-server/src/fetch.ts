import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";

fetch("http://localhost:40111/startquestionansweringwithtextquestion", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question: "Wie ist der Durchschnitt des Luftqualitätsindex in Aalen als Text?",
    componentlist: [
      "qanary-component-measurand-pm",
      "qanary-component-station-pm",
      "qanary-component-calculation-pm",
      "qanary-component-representation-pm",
    ],
    additionalTriples: generateAdditionalTriples({
      stations,
      measurands,
      calculations,
      representations,
    }),
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
