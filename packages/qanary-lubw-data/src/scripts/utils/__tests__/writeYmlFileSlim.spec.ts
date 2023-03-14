import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IWriteYmlFileSlim, writeYmlFile, writeYmlFileSlim } from "../writeYmlFile";

jest.mock("fs");

describe("#Component writeYmlFileSlim", () => {
  const mockWriteFile = jest.fn();
  (fs.writeFile as unknown as jest.Mock) = mockWriteFile;

  const mockWriteYmlFile = jest.fn();
  (writeYmlFile as jest.Mock) = mockWriteYmlFile;

  const mockGenerateNluYmlFileContent = jest.fn().mockImplementation(() => "");
  const options: IWriteYmlFileSlim = {
    data: ["test-data-0", "test-data-1", "test-data-2", "test-data-3"],
    generateNluYmlFileContent: mockGenerateNluYmlFileContent,
    path: "test/path/",
    intent: "test",
    threshold: 1,
  };

  it("should call 'writeYmlFile' with full data", async () => {
    writeYmlFileSlim(options);

    expect(writeYmlFile).toHaveBeenCalledWith({ ...options });
  });

  it("should call 'writeYmlFile' with no data", async () => {
    options.threshold = 0;

    writeYmlFileSlim(options);

    expect(writeYmlFile).toHaveBeenCalledWith({ ...options, data: [] });
  });

  it("should call 'writeYmlFile' with filtered data", async () => {
    options.threshold = 0.5;

    writeYmlFileSlim(options);

    expect(writeYmlFile).toHaveBeenCalledWith({ ...options, data: expect.any(Array) });
  });
});
