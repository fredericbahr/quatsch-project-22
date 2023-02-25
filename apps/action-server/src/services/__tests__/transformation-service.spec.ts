import { ILUBWData, IQanaryAnnotation } from "shared";

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
    {
      annotationType: "qa:AnnotationOfTime",
      hasBody: '{ "start": "2021-03-18T13:00:00.000Z" }',
      hasTarget: "b1",
      annotatedAt: "2021-03-18T13:00:00.000Z",
      annotatedBy: "<urn:qanary:qanary-component-time>",
      score: 1,
    },
  ];

  describe("Transform", () => {
    it("should transform the annotations", () => {
      const expectedLubwData: ILUBWData = {
        station: "DEBW0081",
        calculation: "average",
        measurand: "luqx",
        time: "1d",
        representation: "graph",
      };

      const transformedAnnotations = LUBWDataTransformationService.getTransformedLUBWData(annotations);

      expect(transformedAnnotations).toEqual(expectedLubwData);
    });
  });
});
