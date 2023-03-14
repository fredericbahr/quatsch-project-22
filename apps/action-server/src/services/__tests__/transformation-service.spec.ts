import {
  CALCULATION_TYPE,
  defaultLUBWData,
  ILUBWData,
  ILUBWDataKey,
  IQanaryAnnotation,
  REPRESENTATION_TYPE,
} from "shared";

import { LUBWDataTransformationService } from "../transformation-service";

describe("TransformationService", () => {
  const annotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "DEBW081",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:station-pattern-matching>",
      score: 1,
    },
    {
      annotationType: "qa:AnnotationOfMeasurand",
      hasBody: "luqx",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:measurand-pattern-matching>",
      score: 1,
    },
    {
      annotationType: "qa:AnnotationOfRepresentation",
      hasBody: "graph",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:representation-pattern-matching>",
      score: 1,
    },
  ];

  const uncompletedAnnotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "DEBW081",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:station-pattern-matching>",
      score: 1,
    },
    {
      annotationType: "qa:AnnotationOfMeasurand",
      hasBody: "luqx",
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:measurand-pattern-matching>",
      score: 1,
    },
  ];

  describe("Transform", () => {
    it("should transform the annotations", () => {
      const expectedLubwData: ILUBWData = {
        station: "DEBW081",
        calculation: CALCULATION_TYPE.Average,
        measurand: "luqx",
        time: defaultLUBWData[ILUBWDataKey.Time],
        representation: REPRESENTATION_TYPE.Graph,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(annotations);

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });

    it("should transform the annotations and merge with default values", () => {
      const expectedLubwData: ILUBWData = {
        station: "DEBW081",
        calculation: CALCULATION_TYPE.Average,
        measurand: "luqx",
        time: defaultLUBWData[ILUBWDataKey.Time],
        representation: REPRESENTATION_TYPE.Text,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(uncompletedAnnotations, true);

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });

    it("should transform the annotations and not merge with default values", () => {
      const expectedLubwData: Partial<ILUBWData> = {
        station: "DEBW081",
        calculation: undefined,
        measurand: "luqx",
        time: defaultLUBWData[ILUBWDataKey.Time],
        representation: undefined,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(
        uncompletedAnnotations,
        false,
      );

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });

    describe("Time Transformation", () => {
      const startDate = new Date("2021-03-18T13:00:00.000Z");
      const endDate = new Date("2021-03-19T13:00:00.000Z");

      let timeAnnotation = {
        annotationType: "qa:AnnotationOfTime",
        hasBody: `{ "start": "${startDate.toISOString()}" }`,
        hasTarget: "b1",
        annotatedAt: "2021-03-18T13:00:00.000Z",
        annotatedBy: "<urn:qanary:qanary-component-time>",
        score: 1,
      };

      it("should return default if no time is given", () => {
        const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(
          uncompletedAnnotations,
          false,
        );

        expect(transformedAnnotations.time).toEqual(defaultLUBWData[ILUBWDataKey.Time]);
      });

      it("should return specific time if time is given", () => {
        timeAnnotation = {
          ...timeAnnotation,
          hasBody: `{ "start": "${startDate.toISOString()}", "end": "${endDate.toISOString()}" }`,
        };

        const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData([timeAnnotation], false);

        expect(transformedAnnotations.time).toEqual({
          start: startDate,
          end: endDate,
        });
      });
    });
  });
});
