import { QanaryPipelineApi } from "api";
import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";

QanaryPipelineApi.QanaryQuestionAnsweringControllerApiFactory(
  new QanaryPipelineApi.Configuration({ basePath: "http://localhost:40111" }),
)
  .createStartQuestionAnsweringWithTextQuestion({
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
  })
  .then(console.log);
