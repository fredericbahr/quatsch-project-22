import { IQanaryMessage } from "qanary-component-core";

import { getQuestionUri } from "./get-question-uri";

/**
 * Fetches the raw question from given question url
 * @param questionUrl the url of the question
 * @returns the raw question
 */
const fetchRawQuestion = async (questionUrl: string) => {
  const url = `${questionUrl}/raw`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
};

/**
 * Gets the question from the graph given in the message
 * @param message the message containing the graph and endpoint
 * @returns the asked question
 */
export const getQuestion = async (message: IQanaryMessage): Promise<string | null> => {
  try {
    const questionUri: string = (await getQuestionUri(message)) ?? "";

    return await fetchRawQuestion(questionUri);
  } catch (error) {
    console.error(error);
    return null;
  }
};
