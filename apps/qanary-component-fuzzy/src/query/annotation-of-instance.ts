import path from "path";
import {
  getEndpoint,
  getInGraph,
  queryFileLoader,
  RESERVED_KEYWORD_IN_SPARQL_QUERY,
  selectSparql,
} from "qanary-component-helpers";
import { Literal } from "rdf-js";
import { Domain, IQanaryMessage } from "shared";

/**
 * The response of a SPARQL query to the Qanary Question endpoint fetching a annotation of instance from a ner component.
 */
export type AnnotationOfInstanceSparqlResponse = {
  body: Literal;
  start: Literal;
  end: Literal;
};

/**
 * A converted object for a AnnotationOfInstance element.
 */
export type AnnotationOfInstance = {
  domain: Domain;
  start: number;
  end: number;
};

/**
 * Returns the query to read annotations of instance of the question by a ner component.
 * @param inGraph the inGraph attribute
 * @returns sparql query string
 */
const readQueryAnnotationOfInstance = (inGraph: string): string => {
  const queryPath: string = path.join(__dirname, "./annotation-of-instance.rq");
  return queryFileLoader(queryPath, [
    {
      keyword: RESERVED_KEYWORD_IN_SPARQL_QUERY.YOUR_CURRENT_GRAPH_ID,
      replacement: inGraph,
    },
  ]);
};

/**
 * Tests if the data is empty.
 * @param data the sparql response
 */
const isEmpty = (data: Array<AnnotationOfInstanceSparqlResponse>): boolean => {
  return data.length === 0;
};

/**
 * Builds a AnnotationOfInstance object from a AnnotationOfInstanceSparqlResponse object.
 * @param data the sparql response entry
 * @returns an AnnotationOfInstance object
 */
const buildAnnotationOfInstance = (data: AnnotationOfInstanceSparqlResponse): AnnotationOfInstance => {
  return {
    domain: data.body.value.toLowerCase() as Domain,
    start: parseInt(data.start.value),
    end: parseInt(data.end.value),
  };
};

/**
 * Converts the sparql response to an array of AnnotationOfInstance objects.
 * @param data the sparql response
 * @returns the converted AnnotationOfInstance array
 */
const convertResponseData = (data: Array<AnnotationOfInstanceSparqlResponse>): Array<AnnotationOfInstance> => {
  return data.map((responseEntry) => buildAnnotationOfInstance(responseEntry));
};

/**
 * Returns the annotations of instance of the question provided by a ner component.
 * @param message incoming qanary pipeline message
 * @returns all AnnotationOfInstance objects available for provided question
 */
export const getAnnotationsOfInstance = async (
  message: IQanaryMessage,
): Promise<Array<AnnotationOfInstance> | null> => {
  const inGraph: string = getInGraph(message) ?? "";
  const endpointUrl: string = getEndpoint(message) ?? "";
  const query: string = readQueryAnnotationOfInstance(inGraph);
  const data: Array<AnnotationOfInstanceSparqlResponse> = await selectSparql<AnnotationOfInstanceSparqlResponse>(
    endpointUrl,
    query,
  );

  if (isEmpty(data)) {
    return null;
  }
  return convertResponseData(data);
};
