import { differenceInDays } from "date-fns";
import { CALCULATION_TYPE, ILUBWData, IQanaryAnnotation, REPRESENTATION_TYPE } from "shared";

import { LUBWDataTransformationService } from "../transformation-service";

describe("TransformationService", () => {
  const annotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "DEBW0081",
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

  const uncompleteAnnotations: Array<IQanaryAnnotation> = [
    {
      annotationType: "qa:AnnotationOfStation",
      hasBody: "DEBW0081",
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
        station: "DEBW0081",
        calculation: CALCULATION_TYPE.Average,
        measurand: "luqx",
        time: "1d",
        representation: REPRESENTATION_TYPE.Graph,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(annotations);

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });

    it("should transform the annotations and merge with default values", () => {
      const expectedLubwData: ILUBWData = {
        station: "DEBW0081",
        calculation: CALCULATION_TYPE.Average,
        measurand: "luqx",
        time: "1d",
        representation: REPRESENTATION_TYPE.Text,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(uncompleteAnnotations, true);

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });

    it("should transform the annotations and not merge with default values", () => {
      const expectedLubwData: Partial<ILUBWData> = {
        station: "DEBW0081",
        calculation: undefined,
        measurand: "luqx",
        time: undefined,
        representation: undefined,
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(uncompleteAnnotations, false);

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

      it("should return undefined if no time is given", () => {
        const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(
          uncompleteAnnotations,
          false,
        );

        expect(transformedAnnotations.time).toBeUndefined();
      });

      it("should return days ago from today if only start time is given", () => {
        const expectedDayDifference = differenceInDays(new Date(), startDate);
        const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData([timeAnnotation], false);

        expect(transformedAnnotations.time).toEqual(`${expectedDayDifference}d`);
      });

      it("should return difference in days between start and end time if both are given", () => {
        const expectedDayDifference = differenceInDays(endDate, startDate);

        timeAnnotation = {
          ...timeAnnotation,
          hasBody: `{ "start": "${startDate.toISOString()}", "end": "${endDate.toISOString()}" }`,
        };

        const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData([timeAnnotation], false);

        expect(transformedAnnotations.time).toEqual(`${expectedDayDifference}d`);
      });
    });
  });
});
