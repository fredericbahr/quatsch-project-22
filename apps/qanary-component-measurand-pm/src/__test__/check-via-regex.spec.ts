import { IQanaryMessage } from "qanary-component-core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createAnnotation, IQanaryAnnotation } from "qanary-component-helpers";
import { IMeasurand } from "qanary-lubw-data";

import { checkMeasurandViaRegex } from "../utils/check-via-regex";

jest.mock("qanary-component-helpers", () => ({
  ...jest.requireActual("qanary-component-helpers"),
  createAnnotation: jest.fn(() => Promise.resolve()),
}));

describe("check-via-regex", () => {
  const qanaryMessage: IQanaryMessage = {
    endpoint: "http://qanary-pipeline:40111/sparql",
    inGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
    outGraph: "urn:graph:e8fe00d7-2a1b-4978-acef-af893cd287dd",
  };
  const measurand: IMeasurand = {
    label: "Luftqualitätsindex",
    id: "luqx",
  };

  it("should find an annotation for `Luftqualitätsindex`", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotation as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der Luftqualitätsindex in Berlin?";
    const expectedAnnotation: IQanaryAnnotation = {
      confidence: 1,
      value: measurand.id,
      range: {
        start: 12,
        end: 30,
      },
    };

    await checkMeasurandViaRegex(qanaryMessage, question, measurand);

    expect(mockCreateAnnotation).toHaveBeenCalledWith(qanaryMessage, expect.any(String), expectedAnnotation);
  });

  it("should find an annotation for `luwx`", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotation as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der luqx in Berlin?";
    const expectedAnnotation: IQanaryAnnotation = {
      confidence: 1,
      value: measurand.id,
      range: {
        start: 12,
        end: 16,
      },
    };

    await checkMeasurandViaRegex(qanaryMessage, question, measurand);

    expect(mockCreateAnnotation).toHaveBeenCalledWith(qanaryMessage, expect.any(String), expectedAnnotation);
  });

  it("should not throw an error if no measurand is found", async () => {
    const mockCreateAnnotation = jest.fn(() => Promise.resolve());
    (createAnnotation as jest.Mock) = mockCreateAnnotation;

    const question = "Wie ist der Wasserpegel in Berlin?";

    await checkMeasurandViaRegex(qanaryMessage, question, measurand);

    expect(mockCreateAnnotation).not.toHaveBeenCalled();
  });
});
