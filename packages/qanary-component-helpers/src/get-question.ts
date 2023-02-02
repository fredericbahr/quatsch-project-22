import { IQanaryMessage } from "../../qanary-component-core/src/interfaces/message";
import { getEndpoint, getInGraph } from "./message-operations";
import { selectSparql } from "./query-sparql";

type QuestionSparqlResponse = {
  questionUrl: {
    value: string;
  };
};

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

  const quesiton: string = await response.text();
  return quesiton;
};

/**
 * Gets the question from the graph given in the message
 * @param message the message containing the graph and endpoint
 * @returns the asked question
 */
export const getQuestion = async (
  message: IQanaryMessage
): Promise<string | null> => {
  const inGraph: string = getInGraph(message);
  const endpointUrl: string = getEndpoint(message);

  const queryQuestionUrl = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX oa: <http://www.w3.org/ns/openannotation/core/>
PREFIX qa: <http://www.wdaqua.eu/qa#>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX xmls: <http://www.w3.org/2001/XMLSchema#>
PREFIX stardogintern: <tag:stardog:api:>

SELECT ?questionUrl
FROM <${inGraph}>
WHERE {
  ?questionUrl a qa:Question.
}
LIMIT 1
`;

  try {
    const response = await selectSparql<QuestionSparqlResponse>(
      endpointUrl,
      queryQuestionUrl
    );
    const firstResponse = 0;
    const questionUrl: string = response[firstResponse].questionUrl.value;
    const question: string = await fetchRawQuestion(questionUrl);

    return question;
  } catch (error) {
    console.error(error);
    return null;
  }
};
