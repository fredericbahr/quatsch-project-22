/**
 * Gets the sparql query for the question uri
 * @param inGraph the graph to get the question uri from
 * @returns the sparql query to get the question uri
 */
export const getQuestionUriQuery = (inGraph: string) => `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX oa: <http://www.w3.org/ns/openannotation/core/>
PREFIX qa: <http://www.wdaqua.eu/qa#>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX xmls: <http://www.w3.org/2001/XMLSchema#>
PREFIX stardogintern: <tag:stardog:api:>

SELECT ?questionUri
FROM <${inGraph}>
WHERE {
  ?questionUri a qa:Question.
}
LIMIT 1`;
