import fs from "fs";

import { IWriteYmlFile, writeYmlFile } from "../write-yml-file";

jest.mock("fs");

describe("#Component writeYmlFile", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockGenerateNluYmlFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteYmlFile = {
    data: ["test-data"],
    generateNluYmlFileContent: mockGenerateNluYmlFileContent,
    path: "test/path/",
    intent: "test",
  };

  it("should write yml from provided data and no base data to path with intent", async () => {
    writeYmlFile(options);

    expect(mockGenerateNluYmlFileContent).toHaveBeenCalledWith(options.data, options.intent);
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write yml from provided data and provided base data to path with intent", async () => {
    options.baseData = ["base-data"];

    writeYmlFile(options);

    expect(mockGenerateNluYmlFileContent).toHaveBeenCalledWith([...options.baseData, ...options.data], options.intent);
    expect(mockWriteFile).toHaveBeenCalledWith(options.path, "", expect.any(Function));
  });

  it("should write yml and call callback without error", async () => {
    const mockConsole = jest.spyOn(console, "log");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback());
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeYmlFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith(`rasa nlu examples written to '${options.path}'`);
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });

  it("should log error in write callback when error is provided", async () => {
    const mockConsole = jest.spyOn(console, "error");
    const mockWriteFileWithCallback = jest.fn().mockImplementation((path, data, callback) => callback("test-error"));
    (fs.writeFile as unknown as jest.Mock) = mockWriteFileWithCallback;

    writeYmlFile(options);

    expect(mockWriteFileWithCallback).toHaveBeenCalledWith(options.path, "", expect.any(Function));
    expect(mockConsole).toHaveBeenCalledWith("test-error");
    mockConsole.mockClear();
    mockConsole.mockRestore();
  });
});
