import { topicModel, Topic, ITopic } from "./model";
import { measurandAirModel } from "../measurand/air/model";
import { RasaRequest, AnnotationResponse } from "../../interfaces/http";
import { Annotation, AnnotationScore } from "../../interfaces/annotation";
import { isEntryInModel } from "../../helper/modelHelper";

const findTopicByMeasurand = (searchedMeasurand: string): ITopic => {
  if (isEntryInModel(measurandAirModel, searchedMeasurand)) {
    return topicModel[Topic.Air];
  }
  return topicModel[Topic.None];
};

export const generateTopicAnnotation = (req: RasaRequest): Annotation => {
  const topic = findTopicByMeasurand(req.body.tracker.slots.measurand);

  switch (topic.id) {
    case Topic.Air:
      return new Annotation({
        score: AnnotationScore.String_Match,
        body: {
          responses: [
            {
              text: `Sie wollen etwas aus dem Themenbereich ${topic.label} wissen.`,
            },
          ],
        },
      });

    default:
      return new Annotation({
        body: {
          responses: [
            {
              text: `Der Themenbereich konnte nicht identifiziert werden.`,
            },
            {
              text: `Klicken Sie auf einen Themenbereich, der Sie interessiert:`,
              buttons: Object.values(topicModel)
                .filter((topic) => topic.id !== Topic.None)
                .map((topic) =>
                  Object({
                    title: topic.label,
                    payload: `Ich interessiere mch für das Thema: ${topic.label}`,
                  }),
                ),
            },
          ],
        },
      });
  }
};

export const readTopic = (req: RasaRequest, res: AnnotationResponse) => {
  try {
    res.json(generateTopicAnnotation(req));
  } catch (error) {
    res.status(400);
    res.end();
  }
};
