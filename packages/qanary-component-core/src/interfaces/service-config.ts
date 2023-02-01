/** the configuration of the qanary component/service */
export interface IQanaryComponentCoreServiceConfig {
  /** the url of the Spring Boot Admin Server */
  springBootAdminServerUrl: string;
  /** the username of the Spring Boot Admin Server */
  springBootAdminServerUser: string;
  /** the password of the Spring Boot Admin Server */
  springBootAdminServerPassword: string;
  /** the name of the component/service */
  serviceName: string;
  /** the port of the component/service */
  servicePort: number;
  /** the host of the component/service */
  serviceHost: string;
  /** a description of the component/service */
  serviceDescription: string;
}
