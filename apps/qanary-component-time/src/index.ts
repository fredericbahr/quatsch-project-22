import { IQanaryComponentCoreOptions, QanaryComponentCore } from "qanary-component-core";

import { handler } from "./handler";

/**
 * A configuration object for Qanary components
 */
export const options: IQanaryComponentCoreOptions = {
  handler,
};

// automatically registers the component at the Spring Boot Admin server
QanaryComponentCore(options).catch(console.warn);
