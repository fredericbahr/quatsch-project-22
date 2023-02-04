import { IQanaryComponentCoreMetadata } from "../interfaces/metadata";
import { IQanaryComponentCoreRegistration } from "../interfaces/registration";
import { IQanaryComponentCoreServiceConfig } from "../interfaces/service-config";

/**
 * The needed information to register the component at the Spring Boot Admin Server
 */
type ISpringBootAdminServerInfo = Pick<
  IQanaryComponentCoreServiceConfig,
  "springBootAdminServerUrl" | "springBootAdminServerUser" | "springBootAdminServerPassword"
>;

/**
 * Sleeps for the provided amount of milliseconds
 * @param ms the amount of milliseconds to sleep
 * @returns a promise that resolves after the provided amount of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates the registration object of the component for the Spring Boot Admin based on provided configuration
 * @param config the configuration of the component
 * @returns an registration object for the Spring Boot Admin
 */
const generateRegistration = (config: IQanaryComponentCoreServiceConfig): IQanaryComponentCoreRegistration => {
  const metadata: IQanaryComponentCoreMetadata = {
    start: new Date().toISOString(),
    description: config.serviceDescription,
    about: `${config.serviceHost}:${config.servicePort}/about`,
    "written in": "TypeScript",
  };

  return {
    name: config.serviceName,
    serviceUrl: `${config.serviceHost}:${config.servicePort}`,
    healthUrl: `${config.serviceHost}:${config.servicePort}/health`,
    metadata,
  };
};

/**
 * Calls the Spring Boot Admin Server to register the component by sending a POST request
 * @param registration the registration information of the component
 * @param serverInfo the information of the Spring Boot Admin Server
 */
const callAdminServer = async (
  registration: IQanaryComponentCoreRegistration,
  serverInfo: ISpringBootAdminServerInfo,
) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(
      `${serverInfo.springBootAdminServerUser}:${serverInfo.springBootAdminServerPassword}`,
    ).toString("base64")}`,
  };

  const data: string = JSON.stringify(registration);

  fetch(`${serverInfo.springBootAdminServerUrl}/instances`, {
    method: "POST",
    headers,
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        return console.warn(
          `${registration.serviceUrl} could not be registered at ${serverInfo.springBootAdminServerUrl}/instances`,
          response.status,
          response.statusText,
          response.body,
        );
      }

      console.log(`${registration.serviceUrl} was registered at ${serverInfo.springBootAdminServerUrl}/instances`);
    })
    .catch(() => {
      console.warn(`${serverInfo.springBootAdminServerUrl}/instances is not available`);
    });
};

/**
 * Registers the component/service at the Spring Boot Admin Server and makes it available for the Qanary Pipeline
 * @param config the configuration of the component
 * @param interval the interval in which the component should call the Spring Boot Admin Server
 */
export const registerComponent = async (config: IQanaryComponentCoreServiceConfig, interval = 1000 * 10) => {
  const registration: IQanaryComponentCoreRegistration = generateRegistration(config);

  const serverInfo: ISpringBootAdminServerInfo = {
    springBootAdminServerUrl: config.springBootAdminServerUrl,
    springBootAdminServerUser: config.springBootAdminServerUser,
    springBootAdminServerPassword: config.springBootAdminServerPassword,
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await callAdminServer(registration, serverInfo);
    await sleep(interval);
  }
};
