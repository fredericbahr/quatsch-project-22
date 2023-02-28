import { QanaryPipelineApi } from "api";
import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";

QanaryPipelineApi.QanaryQuestionAnsweringControllerApiFactory(
  new QanaryPipelineApi.Configuration({ basePath: "http://localhost:40111" }),
)
  .createStartQuestionAnsweringWithTextQuestion({
    question: "Was war gestern der Ozonwert in Ulm im Durchschnitt repräsentiert als Text?",
    componentlist: ["qanary-component-ner-automl", "qanary-component-fuzzy"],
    additionalTriples: generateAdditionalTriples({
      stations,
      measurands,
      calculations,
      representations,
    }),
  })
  .then(console.log);
