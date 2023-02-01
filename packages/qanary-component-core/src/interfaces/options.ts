import { IQanaryComponentCoreDescription } from "./description";
import { IQanaryComponentCoreRequestHandler } from "./request-handler";
import { IQanaryComponentCoreServiceConfig } from "./service-config";

/** the options of the qanary component core with optional service config */
export interface IQanaryComponentCoreOptions {
  /** the configuration of the qanary component/service */
  config?: IQanaryComponentCoreServiceConfig;
  /** the request handler of the qanary component/service */
  handler: IQanaryComponentCoreRequestHandler;
  /** the description of the qanary component/service */
  description?: IQanaryComponentCoreDescription;
}

/** the options of the qanary component core with mandatory service config */
export interface IQanaryComponentCoreOptionsWithConfig
  extends IQanaryComponentCoreOptions {
  /** the configuration of the qanary component/service */
  config: IQanaryComponentCoreServiceConfig;
}
