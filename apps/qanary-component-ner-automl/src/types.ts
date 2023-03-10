export type DataVariant = "ner" | "nlu";

export type DomainTemplate = {
  station?: string;
  measurand?: string;
  calculation?: string;
  representation?: string;
};

export type TrainingQuestion = {
  text: (templates: DomainTemplate) => string;
  measurandAllowList?: Array<string>;
  measurandPrefix?: string;
  measurandSuffix?: string;
  representationAllowList?: Array<string>;
  representationPrefix?: string;
  representationSuffix?: string;
  calculationAllowList?: Array<string>;
  calculationPrefix?: string;
  calculationSuffix?: string;
};

export type NerTrainingData = {
  text: string;
  language: string;
  entities: DomainTemplate;
};

export type NluTrainingData = string;
