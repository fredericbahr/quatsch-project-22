import { readMeasurandAir } from "../controller";
import { AnnotationResponse, RasaRequest } from "../../../../interfaces/http";
import { AnnotationScore } from "../../../../interfaces/annotation";

describe("#Measurand controllers", () => {
  test("invalid request body", () => {
    const req = {};
    const res = { status: jest.fn(), end: jest.fn() };

    readMeasurandAir(req as RasaRequest, res as unknown as AnnotationResponse);
    expect(res.status.mock.calls[0][0]).toBe(400);
  });

  test("valid slot", () => {
    const req = { body: { tracker: { slots: { measurand: "Luftqualitätsindex" } } } };
    const res = { status: jest.fn(), json: jest.fn() };

    readMeasurandAir(req as unknown as RasaRequest, res as unknown as AnnotationResponse);
    expect(res.json.mock.calls[0][0]).toHaveProperty("score", AnnotationScore.String_Match);
  });
});
