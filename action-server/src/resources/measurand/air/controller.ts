import { AnnotationResponse, RasaRequest } from "../../../interfaces/http";
import { Annotation, AnnotationScore } from "../../../interfaces/annotation";
import { IMeasurand, Measurand, measurandAirModel } from "./model";
import { findEntryInModel } from "../../../helper/modelHelper";

const findMeasurand = (searchedMeasurand: string): IMeasurand => {
  return findEntryInModel(measurandAirModel, searchedMeasurand) || measurandAirModel[Measurand.None];
};

export const generateMeasurandAirAnnotation = (req: RasaRequest): Annotation => {
  return new Annotation({
    score: AnnotationScore.String_Match,
    body: {
      responses: [
        {
          text: `Messwert: ${JSON.stringify(findMeasurand(req.body.tracker.slots.measurand))}`,
        },
      ],
    },
  });
};

export const readMeasurandAir = (req: RasaRequest, res: AnnotationResponse) => {
  try {
    res.json(generateMeasurandAirAnnotation(req));
  } catch (e) {
    res.status(400);
    res.end();
  }
};
