import { IQanaryMessage } from "shared";

import { QuestionSparqlResponse } from "./interfaces/question-sparql-response";
import { getEndpoint, getInGraph } from "./message-operations";
import { selectSparql } from "./query-sparql";
import { getQuestionUriQuery } from "./utils/question-uri-query";

/**
 * Gets the question uri from the graph given in the message
 * @param message the message containing the graph and endpoint
 * @returns the uri of the question
 */
export const getQuestionUri = async (message: IQanaryMessage): Promise<string | null> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";
  const questionUriQuery = getQuestionUriQuery(inGraph);

  try {
    const response = await selectSparql<QuestionSparqlResponse>(endpointUrl, questionUriQuery);
    const firstResponse = 0;

    return response[firstResponse].questionUri.value;
  } catch (error) {
    console.error(error);
    return null;
  }
};
