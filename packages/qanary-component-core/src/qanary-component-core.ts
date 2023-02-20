import cors from "cors";
import express, { Express } from "express";

import { errorRequestHandler } from "./middlewares/error/error.middleware";
import { aboutRouter } from "./resources/about/about.router";
import { IQanaryComponentMessageHandler } from "./resources/annotatequestion/annotatequestion.model";
import { annotateQuestionRouter } from "./resources/annotatequestion/annotatequestion.router";
import { healthRouter } from "./resources/health/health.router";
import { QanaryComponentCoreServiceConfig } from "./services/registration/registration.model";
import { registrationService } from "./services/registration/registration.service";

/** the options of the qanary component core with optional service config */
export interface IQanaryComponentCoreOptions {
  /** the request handler of the qanary component/service */
  handler: IQanaryComponentMessageHandler;
}

/**
 * The core implementation (blueprint) of a Qanary component
 * @param options the options of the component
 * @returns the express app instance
 */
export async function QanaryComponentCore(options: IQanaryComponentCoreOptions): Promise<Express> {
  const app: Express = express();

  // For parsing application/json
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // Routes
  app.use("/", await aboutRouter());
  app.use("/annotatequestion", await annotateQuestionRouter(options.handler));
  app.use("/health", await healthRouter());

  // body parser error handler
  app.use(errorRequestHandler);

  // Generate service configurations
  const config = await QanaryComponentCoreServiceConfig.create();

  // Start app
  app.listen(config.springBootAdminClientInstanceServiceBaseUrl.port, async () => {
    // Initialize services
    console.log(`Started Qanary component at ${config.springBootAdminClientInstanceServiceBaseUrl}`);
    await registrationService(config);
  });

  // Export app
  return app;
}
