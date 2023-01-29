import { IQanaryComponentCoreMetadata } from "./metadata";

/** the registration of the component/service send to the Spring Boot Admin */
export interface IQanaryComponentCoreRegistration {
  /** the name of the component */
  name: string;
  /** the url of the component/service */
  serviceUrl: string;
  /** the url to the `health`-endpoint */
  healthUrl: string;
  /** the metadata of the component */
  metadata: IQanaryComponentCoreMetadata;
}
