const ROOT = "../..";
const APP_NER = `${ROOT}/apps/qanary-component-ner-automl-training`;
const APP_RASA = `${ROOT}/apps/rasa`;

export const basePaths = {
  trainCSV: `${APP_NER}/trainingdata/train.csv`,
  testCSV: `${APP_NER}/trainingdata/test.csv`,
  trainJSON: `${APP_NER}/trainingdata/train.json`,
  testJSON: `${APP_NER}/trainingdata/test.json`,
  measurandCompleteYML: `${APP_RASA}/data/nlu/measurand-complete.yml`,
  measurandMaxYML: `${APP_RASA}/data/nlu/measurand-max.yml`,
  measurandMinYML: `${APP_RASA}/data/nlu/measurand-min.yml`,
  measurandThresholdYML: `${APP_RASA}/data/nlu/measurand-threshold.yml`,
  measurandSeasonYML: `${APP_RASA}/data/nlu/measurand-season.yml`,
};
