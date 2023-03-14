import fs from "fs";

import { IWriteJsonFile, writeJsonFile } from "../write-json-file";

jest.mock("fs");

describe("#Component writeJsonFile", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockGenerateNerJsonFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteJsonFile = {
    data: [
      {
        text: "test-text",
        language: "de",
        entities: {
          station: "test-station",
          measurand: "test-measurand",
          calculation: "test-calculation",
          representation: "test-representation",
        },
      },
    ],
    generateNerJsonFileContent: mockGenerateNerJsonFileContent,
    path: "test/path/",
    dataKey: "testingdata",
  };

  it("should write json from provided data and no base data to path with dataKey", async () => {
    writeJsonFile(options);

    expect(mockGenerateNerJsonFileContent).toHaveBeenCalledWith(options.data, options.dataKey);
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write json from provided data and provided base data to path with dataKey", async () => {
    options.baseData = [
      {
        text: "base-text",
        language: "de",
        entities: {
          station: "base-station",
          measurand: "base-measurand",
          calculation: "base-calculation",
          representation: "base-representation",
        },
      },
    ];

    writeJsonFile(options);

    expect(mockGenerateNerJsonFileContent).toHaveBeenCalledWith(
      [...options.baseData, ...options.data],
      options.dataKey,
    );
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write json and call callback without error", async () => {
    const mockConsole = jest.spyOn(console, "log");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback());
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeJsonFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith(`qanary ner component training data written to '${options.path}'`);
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });

  it("should log error in write callback when error is provided", async () => {
    const mockConsole = jest.spyOn(console, "error");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback("test-error"));
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeJsonFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith("test-error");
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });
});
