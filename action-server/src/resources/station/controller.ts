import { AnnotationResponse, RasaRequest } from "../../interfaces/http";
import { Annotation, AnnotationScore } from "../../interfaces/annotation";
import { IStation, Station, stationModel } from "./model";
import { findEntryInModel } from "../../helper/modelHelper";

const findStation = (searchedStation: string): IStation => {
  return findEntryInModel(stationModel, searchedStation) || stationModel[Station.None];
};

export const generateStationAnnotation = (req: RasaRequest): Annotation => {
  return new Annotation({
    score: AnnotationScore.String_Match,
    body: {
      responses: [
        {
          text: `Messstation: ${JSON.stringify(findStation(req.body.tracker.slots.station))}`,
        },
      ],
    },
  });
};

export const readStation = (req: RasaRequest, res: AnnotationResponse) => {
  try {
    res.json(generateStationAnnotation(req));
  } catch (e) {
    res.status(400);
    res.end();
  }
};
