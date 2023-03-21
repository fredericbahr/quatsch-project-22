import * as chrono from "chrono-node";
import { ParsedResult } from "chrono-node";
import { IQanaryComponentMessageHandler } from "qanary-component-core";
import { createAnnotationInKnowledgeGraph, getQuestion, IAnnotationInformation } from "qanary-component-helpers";
import { annotationTypesMap, Domain, IQanaryMessage } from "shared";

import pkg from "../package.json";
import { getAnnotationOfQuestionLanguage } from "./query/annotation-of-question-language";
import { calcConfidence } from "./utils/calc-confidence";
import { getChronoLanguageCode, LanguageCode } from "./utils/get-chrono-language-code";
import { transformToAnnotationValue } from "./utils/transform-to-annotation-value";

/**
 * This function maps a found date (ParsedResult) to an annotation
 * @param parsedResult a found time span or a time value within the question
 */
const adapterAnnotationInformation = (parsedResult: ParsedResult): IAnnotationInformation => {
  return {
    value: transformToAnnotationValue(parsedResult),
    confidence: calcConfidence(parsedResult),
    range: {
      start: parsedResult.index,
      end: parsedResult.index + parsedResult.text.length,
    },
  };
};

/**
 * An event handler for incoming messages of the Qanary pipeline
 * Exported only for testing purposes
 * @param message incoming qanary pipeline message
 */
export const handler: IQanaryComponentMessageHandler = async (message: IQanaryMessage) => {
  const pipelineOrigin: string | undefined = process.env["QANARY_ORIGIN"];
  const componentName: string = pkg.name;

  /** the question to check if it contains domain instances */
  const question: string | null = await getQuestion(message, pipelineOrigin);
  if (!question) {
    throw new Error("Could not get question from qanary pipeline");
  }

  const previouslyDetectedLanguage: string | null = await getAnnotationOfQuestionLanguage(message);
  const languageCode: LanguageCode = getChronoLanguageCode(previouslyDetectedLanguage);
  const foundDates: Array<ParsedResult> = chrono[languageCode].parse(question);
  const annotationInformationList: Array<IAnnotationInformation> = foundDates
    .map(adapterAnnotationInformation)
    .sort((a: IAnnotationInformation, b: IAnnotationInformation) => b.confidence - a.confidence);

  /** Update knowledge graph for each found */
  for (const annotationInformation of annotationInformationList) {
    await createAnnotationInKnowledgeGraph({
      message,
      componentName,
      annotation: annotationInformation,
      annotationType: annotationTypesMap.get(Domain.Time),
    });
    console.log(`Found time at index: ${annotationInformation.range?.start}`, annotationInformation);
  }

  return message;
};
