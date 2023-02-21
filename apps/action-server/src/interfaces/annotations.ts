/** The qanary annotation interface  */
export interface IQanaryAnnotation {
  /** the type of annotation, e.g AnnotationAnswer */
  annotationType: string;
  /** the target of the annotation */
  hasTarget: string;
  /** the body/value of the annotation*/
  hasBody: string;
  /** the time when the annotation was created */
  annotatedAt: string;
  /** the component that created the annotation */
  annotatedBy: string;
  /** the score/confidence of the annotation */
  score: number;
}
