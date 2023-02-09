import { calculations, measurands, representations,stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";

fetch("http://localhost:40111/startquestionansweringwithtextquestion", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question: "Wie ist der Luftqualitätsindex und Stickstoffdioxidwert in Ulm?",
    componentlist: ["qanary-component-measurand-pm"],
    additionalTriples: generateAdditionalTriples({
      stations,
      measurands,
      calculations,
      representations,
    }),
  }),
});
