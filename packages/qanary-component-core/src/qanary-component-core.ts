import express from "express";
import { Express } from "express-serve-static-core";
import { aboutHandler } from "./controller/aboutHandler";
import { healthHandler } from "./controller/healthHandler";
import { registerComponent } from "./controller/registration";
import {
  IQanaryComponentCoreOptions,
  IQanaryComponentCoreOptionsWithConfig,
} from "./interfaces/options";
import { IQanaryComponentCoreDescription } from "./interfaces/description";
import { IQanaryComponentCoreServiceConfig } from "./interfaces/service-config";
import { createServer } from "net";

/**
 * A function that determines the next free port starting from a given port.
 * @param port start port
 */
const getPort = (port = 40500) => {
  const server = createServer();

  return new Promise<number>((resolve, reject) =>
    server
      .on("error", (error: { code: string }) => {
        error.code === "EADDRINUSE" ? server.listen(++port) : reject(error);
      })
      .on("listening", () => server.close(() => resolve(port)))
      .listen(port)
  );
};

/**
 * Adds standard options to missing options
 * @param options incomplete options
 */
const getDefaultOptions = async (
  options: IQanaryComponentCoreOptions
): Promise<IQanaryComponentCoreOptionsWithConfig> => {
  const pkg = await import(`${process.cwd()}/package.json`);
  const port = await getPort();

  const defaultConfig: IQanaryComponentCoreServiceConfig = {
    springBootAdminServerUrl: "http://localhost:40111",
    springBootAdminServerUser: "admin",
    springBootAdminServerPassword: "admin",
    serviceName: pkg.name ?? "",
    servicePort: port,
    serviceHost: "http://localhost",
    serviceDescription: pkg.description ?? "",
  };

  const defaultDescription: IQanaryComponentCoreDescription = {
    name: pkg.name ?? "",
    description: pkg.description ?? "",
    version: pkg.version ?? "",
  };

  return {
    config: { ...defaultConfig, ...options.config },
    handler: options.handler,
    description: { ...defaultDescription, ...options.description },
  };
};

/**
 * The core implementation (blueprint) of a Qanary component
 * @param options the options of the component
 * @returns the express server instance
 */
export async function QanaryComponentCore(
  options: IQanaryComponentCoreOptions
): Promise<Express> {
  const server: Express = express();
  const optionsWithConfig = await getDefaultOptions(options);

  server.get(["/health"], healthHandler);

  server.get(["/", "/about"], aboutHandler(optionsWithConfig.description));

  server.get(["/annotatequestion"], optionsWithConfig.handler);

  server.listen(optionsWithConfig.config.servicePort, async () => {
    console.log(
      `Server of component ${optionsWithConfig.config.serviceName} is listening on ${optionsWithConfig.config.serviceHost}:${optionsWithConfig.config.servicePort}`
    );

    await registerComponent(optionsWithConfig.config);
  });

  return server;
}
