import fs from "fs";

import { IWriteCsvFile, writeCsvFile } from "../writeCsvFile";

jest.mock("fs");

describe("#Component writeCsvFile", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockGenerateNerCsvFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteCsvFile = {
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
    generateNerCsvFileContent: mockGenerateNerCsvFileContent,
    path: "test/path/",
  };

  it("should write csv from provided data and no base data to path with dataKey", async () => {
    writeCsvFile(options);

    expect(mockGenerateNerCsvFileContent).toHaveBeenCalledWith(options.data);
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write csv from provided data and provided base data to path with dataKey", async () => {
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

    writeCsvFile(options);

    expect(mockGenerateNerCsvFileContent).toHaveBeenCalledWith([...options.baseData, ...options.data]);
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write csv and call callback without error", async () => {
    const mockConsole = jest.spyOn(console, "log");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback());
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeCsvFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith(`qanary ner component training data written to '${options.path}'`);
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });

  it("should log error in write callback when error is provided", async () => {
    const mockConsole = jest.spyOn(console, "error");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback("test-error"));
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeCsvFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith("test-error");
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });
});
