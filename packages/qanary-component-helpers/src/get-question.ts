import { IQanaryMessage } from "qanary-component-core";

import { QuestionSparqlResponse } from "./interfaces/question-sparql-response";
import { getEndpoint, getInGraph } from "./message-operations";
import { selectSparql } from "./query-sparql";
import { getQuestionUriQuery } from "./utils/question-uri-query";

/**
 * Fetches the raw question from given question url
 * @param questionUrl the url of the question
 * @param origin the origin for the question request, e.g the origin of qanary pipeline
 * @returns the raw question
 */
const fetchRawQuestion = async (questionUrl: string, origin?: string) => {
  const url: URL = new URL(questionUrl);

  // adjust url to match the origin of the qanary pipeline (e.g. in containerized environments)
  const adjustedUrl: string = origin ? `${origin}${url.pathname}/raw` : `${questionUrl}/raw`;

  const response = await fetch(adjustedUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const question: string = await response.text();
  return question;
};

/**
 * Gets the question from the graph given in the message
 * @param message the message containing the graph and endpoint
 * @param origin the origin for the question request, e.g the origin of qanary pipeline
 * @returns the asked question
 */
export const getQuestion = async (message: IQanaryMessage, origin?: string): Promise<string | null> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";

  const questionUriQuery = getQuestionUriQuery(inGraph);

  try {
    const response = await selectSparql<QuestionSparqlResponse>(endpointUrl, questionUriQuery);
    const firstResponse = 0;
    const questionUrl: string = response[firstResponse].questionUri.value;

    return await fetchRawQuestion(questionUrl, origin);
  } catch (error) {
    console.error(error);
    return null;
  }
};
