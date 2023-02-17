import { QanaryPipelineApi } from "api";
import { calculations, measurands, representations, stations } from "qanary-lubw-data";
import { generateAdditionalTriples } from "qanary-seeding-helpers";
import { IQanaryMessage } from "shared";

/**
 * Starts a Qanary pipeline with the given question and component list
 * @param question the question to be answered
 * @param componentlist the list of components to be used
 * @returns a qanary message created by the pipeline
 */
export const startQanaryPipeline = async (question: string, componentlist: string[]): Promise<IQanaryMessage> => {
  const qanaryPipelineOrigin: string = process.env["QANARY_ORIGIN"] || "http://qanary-pipeline:40111";

  /** additional triples to seed the qanary pipeline */
  const additionalTriples: string = generateAdditionalTriples({
    stations,
    measurands,
    calculations,
    representations,
  });

  const qanaryPipelineResponse = await QanaryPipelineApi.QanaryQuestionAnsweringControllerApiFactory(
    new QanaryPipelineApi.Configuration({ basePath: qanaryPipelineOrigin }),
  ).createStartQuestionAnsweringWithTextQuestion({
    question,
    componentlist,
    additionalTriples,
  });

  return qanaryPipelineResponse.data;
};
