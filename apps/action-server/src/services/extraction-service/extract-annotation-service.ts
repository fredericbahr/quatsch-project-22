import path from "path";
import {
  getEndpoint,
  getInGraph,
  queryFileLoader,
  RESERVED_KEYWORD_IN_SPARQL_QUERY,
  selectSparql,
} from "qanary-component-helpers";
import { AnnotationTypes, IQanaryAnnotation, IQanaryMessage, IRawAnnotation } from "shared";

/**
 * A service that extracts annotations from the qanary knowledge graph
 */
export class AnnotationExtractionService {
  /**
   * Extracts all annotations from the knowledge graph
   * @param qanaryMessage the qanary message containing the knowledge graph uri
   * @returns the extracted annotations
   */
  public static async extractAllAnnotations(qanaryMessage: IQanaryMessage): Promise<Array<IQanaryAnnotation>> {
    const endpoint: string = getEndpoint(qanaryMessage) ?? "";
    const annotationQuery: string = this.getAnnotationQuery(qanaryMessage);

    try {
      const rawAnnotations: Array<IRawAnnotation> = await selectSparql<IRawAnnotation>(endpoint, annotationQuery);

      return this.transformRawAnnotations(rawAnnotations);
    } catch (error: unknown) {
      console.error("Error while extracting annotations", error);

      throw error;
    }
  }

  /**
   * Transforms raw annotations of the given annotation type from the knowledge graph
   * @param annotationType the type of the annotation to extract
   * @param qanaryMessage the qanary message containing the knowledge graph uri
   * @returns the extracted annotations
   */
  public static async extractAnnotationsByType(
    qanaryMessage: IQanaryMessage,
    annotationType: AnnotationTypes,
  ): Promise<Array<IQanaryAnnotation>> {
    const endpoint: string = getEndpoint(qanaryMessage) ?? "";
    const annotationQuery: string = this.getAnnotationQuery(qanaryMessage, annotationType);

    try {
      const rawAnnotations: Array<IRawAnnotation> = await selectSparql<IRawAnnotation>(endpoint, annotationQuery);

      return this.transformRawAnnotations(rawAnnotations);
    } catch (error: unknown) {
      console.error("Error while extracting annotations", error);

      throw error;
    }
  }

  /**
   * Gets the query to get annotations from the knowledge graph
   * @param qanaryMessage the qanary message containing the knowledge graph uri
   * @param annotationTypes the annotation types to extract
   * @returns the query to get annotations from the knowledge graph
   */
  private static getAnnotationQuery(
    qanaryMessage: IQanaryMessage,
    annotationTypes: string = this.getAllAnnotationTypes(),
  ): string {
    const inGraph: string = getInGraph(qanaryMessage) ?? "";
    const queryPath: string = path.join(__dirname, "./get-annotations-query.rq");

    return queryFileLoader(queryPath, [
      {
        keyword: RESERVED_KEYWORD_IN_SPARQL_QUERY.YOUR_CURRENT_GRAPH_ID,
        replacement: inGraph,
      },
      {
        keyword: RESERVED_KEYWORD_IN_SPARQL_QUERY.YOUR_ANNOTATION_TYPES,
        replacement: annotationTypes,
      },
    ]);
  }

  /**
   * Gets all annotation types to filter for inside the query by concatenating the annotation types
   * @returns the concatenated annotation types
   */
  private static getAllAnnotationTypes(): string {
    return Object.values(AnnotationTypes).join(",");
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
