import { RasaRequest } from "../interfaces/http";
import { Annotation } from "../interfaces/annotation";

export const qanaryBypass = (req: RasaRequest): Annotation => {
  return new Annotation({
    score: Math.random(),
    body: {
      responses: [
        {
          text: `Qanary response for ${req.body.next_action}`,
        },
      ],
    },
  });
};

export const compare = (annotationA: Annotation, annotationB: Annotation): Annotation => {
  if (annotationA.score < annotationB.score) {
    return annotationB;
  }
  return annotationA;
};
