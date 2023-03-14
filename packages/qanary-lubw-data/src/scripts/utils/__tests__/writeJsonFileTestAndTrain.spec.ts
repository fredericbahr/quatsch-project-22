import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IWriteJsonFileTestAndTrain, writeJsonFile, writeJsonFileTestAndTrain } from "../writeJsonFile";

jest.mock("fs");

describe("#Component writeJsonFileTestAndTrain", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockWriteJsonFile = jest.fn();
  (writeJsonFile as jest.Mock) = mockWriteJsonFile;

  const mockGenerateNerJsonFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteJsonFileTestAndTrain = {
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
    generateNerJsonFileContent: mockGenerateNerJsonFileContent,
    trainPath: "train/path/",
    testPath: "test/path/",
  };

  it("should call 'writeJsonFile' twice with randomly split data", async () => {
    writeJsonFileTestAndTrain(options);

    expect(writeJsonFile).toHaveBeenCalledTimes(2);
    expect(mockWriteJsonFile.mock.calls[0][0]).toStrictEqual({
      data: expect.any(Array),
      baseData: options.baseData,
      generateNerJsonFileContent: mockGenerateNerJsonFileContent,
      path: options.trainPath,
      dataKey: "trainingdata",
    });
    expect(mockWriteJsonFile.mock.calls[1][0]).toStrictEqual({
      data: expect.any(Array),
      baseData: options.baseData,
      generateNerJsonFileContent: options.generateNerJsonFileContent,
      path: options.testPath,
      dataKey: "testingdata",
    });
  });
});
