import { IRasaResponseBody } from "./http";

export enum AnnotationScore {
  String_Match = 1,
  Failover = 0.5,
}

interface IAnnotationOptions<T = IRasaResponseBody> {
  type?: string;
  body: T;
  annotatedAt?: string;
  score?: AnnotationScore;
  annotatedBy?: string;
}

export class Annotation<T = IRasaResponseBody> implements IAnnotationOptions<T> {
  type: string;
  body: T;
  annotatedAt: string;
  score: AnnotationScore;
  annotatedBy: string;

  constructor(options: IAnnotationOptions<T>) {
    this.type = options.type ?? "IRasaResponseBody";
    this.body = options.body;
    this.annotatedAt = options.annotatedAt ?? new Date().toISOString();
    this.score = options.score ?? AnnotationScore.Failover;
    this.annotatedBy = options.annotatedBy ?? "ActionServer";
  }
}
