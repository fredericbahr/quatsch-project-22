import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IWriteCsvFileTestAndTrain, writeCsvFile, writeCsvFileTestAndTrain } from "../writeCsvFile";

jest.mock("fs");

describe("#Component writeCsvFileTestAndTrain", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockWriteCsvFile = jest.fn();
  (writeCsvFile as jest.Mock) = mockWriteCsvFile;

  const mockGenerateNerCsvFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteCsvFileTestAndTrain = {
    data: [
      {
        text: "test-text-0",
        language: "de",
        entities: {
          station: "test-station-0",
          measurand: "test-measurand-0",
          calculation: "test-calculation-0",
          representation: "test-representation-0",
        },
      },
      {
        text: "test-text-1",
        language: "de",
        entities: {
          station: "test-station-1",
          measurand: "test-measurand-1",
          calculation: "test-calculation-1",
          representation: "test-representation-1",
        },
      },
      {
        text: "test-text-2",
        language: "de",
        entities: {
          station: "test-station-2",
          measurand: "test-measurand-2",
          calculation: "test-calculation-2",
          representation: "test-representation-2",
        },
      },
      {
        text: "test-text-3",
        language: "de",
        entities: {
          station: "test-station-3",
          measurand: "test-measurand-3",
          calculation: "test-calculation-3",
          representation: "test-representation-3",
        },
      },
    ],
    generateNerCsvFileContent: mockGenerateNerCsvFileContent,
    trainPath: "train/path/",
    testPath: "test/path/",
  };

  it("should call 'writeCsvFile' twice with randomly split data", async () => {
    writeCsvFileTestAndTrain(options);

    expect(writeCsvFile).toHaveBeenCalledTimes(2);
    expect(mockWriteCsvFile.mock.calls[0][0]).toStrictEqual({
      data: expect.any(Array),
      baseData: options.baseData,
      generateNerCsvFileContent: mockGenerateNerCsvFileContent,
      path: options.trainPath,
    });
    expect(mockWriteCsvFile.mock.calls[1][0]).toStrictEqual({
      data: expect.any(Array),
      baseData: options.baseData,
      generateNerCsvFileContent: options.generateNerCsvFileContent,
      path: options.testPath,
    });
  });
});
