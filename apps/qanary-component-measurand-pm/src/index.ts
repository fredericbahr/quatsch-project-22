import { QanaryComponentCore } from "qanary-component-core";
import { IQanaryComponentCoreOptions } from "qanary-component-core";

import { handler } from "./handler";

/**
 * The configuration object for qanary measurand pm component
 */
export const options: IQanaryComponentCoreOptions = {
  handler,
};

// automatically registers the component at the Spring Boot Admin server
QanaryComponentCore(options).catch(console.warn);
