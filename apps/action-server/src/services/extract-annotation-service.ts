import { IQanaryMessage } from "api/dist/qanary-component";
import { getEndpoint, getInGraph, selectSparql } from "qanary-component-helpers";
import { annotationTypes } from "qanary-component-pm";
import { BlankNode, Literal, NamedNode } from "rdf-js";

import { IQanaryAnnotation } from "../interfaces/annotations";

interface IRawAnnotation {
  annotation: NamedNode;
  annotationType: NamedNode;
  target: BlankNode;
  body: Literal;
  score: Literal;
  annotatedBy: NamedNode;
  annotatedAt: Literal;
}

/**
 * A service that extracts annotations from the qanary knowledge graph
 */
export class AnnotationExtractionService {
  /**
   * Extracts all annotations from the knowledge graph
   * @param qanaryMessage the qanary message containing the knowledge graph uri
   * @returns the extracted annotations
   */
  public static async extractAnnotations(qanaryMessage: IQanaryMessage): Promise<Array<IQanaryAnnotation>> {
    const endpoint: string = getEndpoint(qanaryMessage) ?? "";
    const annotationQuery: string = this.getAnnotationQuery(qanaryMessage);

    try {
      const rawAnnotations = await selectSparql<IRawAnnotation>(endpoint, annotationQuery);

      return this.transformRawAnnotations(rawAnnotations);
    } catch (error: unknown) {
      console.error("Error while extracting annotations", error);

      throw error;
    }
  }

  /**
   * Gets the query to get all annotations from the knowledge graph
   * @param qanaryMessage the qanary message containing the knowledge graph uri
   * @returns the query to get all annotations from the knowledge graph
   */
  private static getAnnotationQuery(qanaryMessage: IQanaryMessage): string {
    const inGraph = getInGraph(qanaryMessage) ?? "";

    return `
PREFIX qa: <http://www.wdaqua.eu/qa#>
PREFIX oa: <http://www.w3.org/ns/openannotation/core/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?annotation ?target ?body ?score ?annotatedBy ?annotatedAt ?annotationType
FROM <${inGraph}>
WHERE {
    ?annotation a ?annotationType ;
      oa:hasTarget ?target ;
      oa:hasBody ?body ;
      oa:score ?score ;
      oa:annotatedBy ?annotatedBy ;
      oa:annotatedAt ?annotatedAt .
    FILTER (?annotationType IN (qa:AnnotationAnswer,qa:AnnotationOfTextualAnswer${this.getAnnotationTypes()}))
}`;
  }

  /**
   * Gets the annotation types to filter for inside the query by concatenating the annotation types
   * @returns the concatenated annotation types
   */
  private static getAnnotationTypes(): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const concatenatedAnnotationTypes: string = Array.from(annotationTypes, ([_name, value]) => value).join(",");

    return annotationTypes.size > 0 ? `, ${concatenatedAnnotationTypes}` : "";
  }

  /**
   * Transforms raw annotations to the qanary annotation interface for further processing
   * @param annotations the raw annotations retruned by the sparql query
   * @returns the transformed/mapped annotations
   */
  private static transformRawAnnotations(annotations: Array<IRawAnnotation>): Array<IQanaryAnnotation> {
    return annotations.map((annotation: IRawAnnotation) => {
      return {
        // sparql client return uri with hasthag: qa#AnnotationOfMeasurand
        annotationType: annotation.annotationType.value.replace("#", ":"),
        hasBody: annotation.body.value,
        hasTarget: annotation.target.value,
        score: Number(annotation.score.value),
        annotatedBy: annotation.annotatedBy.value,
        annotatedAt: annotation.annotatedAt.value,
      } as IQanaryAnnotation;
    });
  }
}
