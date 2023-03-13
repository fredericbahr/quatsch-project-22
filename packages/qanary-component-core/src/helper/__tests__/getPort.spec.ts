import EventEmitter from "events";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createServer } from "net";

import { getPort } from "../getPort";

interface IMockServerType extends EventEmitter {
  listen?: (port: number) => void;
  close?: (callback: () => void) => void;
}

const DEFAULT_PORT = 40500;
const BASE_PORT = 1234;
const IN_USE_PORT_1 = 8080;
const IN_USE_PORT_2 = 8081;
const FIRST_UNSUSED_PORT = 8082;
const ERROR_PORT = 3000;

const OTHER_ERROR = { code: "OTHERERROR" };

jest.mock("net", () => {
  return {
    createServer: jest.fn().mockImplementation(() => {
      const myEE: IMockServerType = new EventEmitter();
      myEE.listen = jest.fn((port) => {
        switch (port) {
          case IN_USE_PORT_1:
          case IN_USE_PORT_2:
            myEE.emit("error", { code: "EADDRINUSE" });
            break;
          case ERROR_PORT:
            myEE.emit("error", OTHER_ERROR);
            break;
          default:
            myEE.emit("listening");
            break;
        }
      });
      myEE.close = jest.fn((callback) => callback());
      return myEE;
    }),
  };
});

describe("#Component getPort", () => {
  it("should return default port if it is not in use", async () => {
    const resultPort = await getPort();

    expect(resultPort).toStrictEqual(DEFAULT_PORT);
  });

  it("should return provided port if it is not in use", async () => {
    const resultPort = await getPort(BASE_PORT);

    expect(resultPort).toStrictEqual(BASE_PORT);
  });

  it("should increase port and return first unused port if provided is in use", async () => {
    const resultPort = await getPort(IN_USE_PORT_1);

    expect(resultPort).toStrictEqual(FIRST_UNSUSED_PORT);
  });

  it("should reject on other error", async () => {
    await expect(getPort(ERROR_PORT)).rejects.toStrictEqual(OTHER_ERROR);
  });
});
