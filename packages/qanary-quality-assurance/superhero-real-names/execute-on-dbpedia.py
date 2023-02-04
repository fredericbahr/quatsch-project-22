from SPARQLWrapper import SPARQLWrapper, JSON
from pprint import pprint

def validate(test, logger, conf_qanary, connection, graphid):
    """
    validates a SPARQL created by the Qanary process
    1. the create SPARQL query is retrieved from the Qanary triplestore
    2. the SPARQL query is executed on DBpedia as it is intended by this particular system

    Returns:
        Boolean: True if the answer of DBpedia was one row containing the correct answer
    """    

    field_name = "createdAnswerQuery"

    # first get the created SPARQL query from the Qanary triplestore
    query_for_computed_answer = """
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX oa: <http://www.w3.org/ns/openannotation/core/>
        PREFIX qa: <http://www.wdaqua.eu/qa#>
        PREFIX dbr: <http://dbpedia.org/resource/>
        PREFIX xmls: <http://www.w3.org/2001/XMLSchema#>
    
        SELECT ?%s
        FROM <%s>
        WHERE {
            ?annotationId rdf:type qa:AnnotationOfAnswerSPARQL .
            ?annotationId oa:hasBody ?createdAnswerQuery.
        }
    """ % (field_name, graphid)
    logger.info("query_for_computed_answer: %s" % (query_for_computed_answer,))
    #result = connection.select(query_for_computed_answer)
    connection.setQuery(query_for_computed_answer)
    connection.setReturnFormat(JSON)
    result = connection.query().convert()
    result_rows = result.get("results").get("bindings")

    # if more than 1 answer query was created, then it is considered to be wrong
    if len(result_rows) != 1:
        return False
    else:
        computed_answer_query = result_rows[0].get(field_name).get("value")
        logger.info("computed_answer_query: %s" % (computed_answer_query,))
        sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        sparql.setReturnFormat(JSON)
        sparql.setQuery(computed_answer_query)

        # result from DBpedia is just ok if there is exactly 1 result
        if len(sparql.query().convert().get("results").get("bindings")) == 1:
            return True
        else:
            return False