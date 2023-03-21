import path from "path";
import {
  getEndpoint,
  getInGraph,
  queryFileLoader,
  RESERVED_KEYWORD_IN_SPARQL_QUERY,
  selectSparql,
} from "qanary-component-helpers";
import { Literal } from "rdf-js";
import { IQanaryMessage } from "shared";

/**
 * The response of a SPARQL query to the Qanary Question endpoint fetching the question url.
 */
export type QuestionSparqlResponse = {
  languageCode: Literal;
};

/**
 * Returns the query to annotate the language of the question
 * @param inGraph the inGraph attribute
 */
const readQueryAnnotationOfQuestionLanguage = (inGraph: string): string => {
  const queryPath: string = path.join(__dirname, "./annotation-of-question-language.rq");
  return queryFileLoader(queryPath, [
    {
      keyword: RESERVED_KEYWORD_IN_SPARQL_QUERY.YOUR_CURRENT_GRAPH_ID,
      replacement: inGraph,
    },
  ]);
};

/**
 * Tests if the data is empty
 * @param data the sparql response
 */
const isEmpty = (data: Array<QuestionSparqlResponse>) => {
  return data.length === 0;
};

/**
 * Returns the annotation of the language of the question
 * @param message incoming qanary pipeline message
 */
export const getAnnotationOfQuestionLanguage = async (message: IQanaryMessage): Promise<string | null> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";
  const query: string = readQueryAnnotationOfQuestionLanguage(inGraph);
  const data: Array<QuestionSparqlResponse> = await selectSparql<QuestionSparqlResponse>(endpointUrl, query);

  if (isEmpty(data)) {
    return null;
  }
  return data[0].languageCode.value;
};
