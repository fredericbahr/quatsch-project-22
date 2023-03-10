import { SpringBootAdminServerApi } from "api";

import { QanaryComponentCoreServiceConfig, RegistrationInfo } from "../registration.model";
import { callAdminServer } from "../registration.service";

let mockCreateInstances = jest.fn(() => Promise.resolve({}));

jest.mock("api", () => {
  return {
    SpringBootAdminServerApi: {
      SpringBootAdminServerApiFactory: jest.fn().mockImplementation(() => {
        return {
          createInstances: mockCreateInstances,
        };
      }),
    },
  };
});

describe("#Component callAdminServer", () => {
  const SPRING_BOOT_ADMIN_URL = new URL("http://spring-boot-url.test:1234");
  const SPRING_BOOT_CLIENT_URL = new URL("http://service-base-url.test:1234");

  const serviceConfig = {
    springBootAdminUrl: SPRING_BOOT_ADMIN_URL,
    springBootAdminClientInstanceServiceBaseUrl: SPRING_BOOT_CLIENT_URL,
  } as QanaryComponentCoreServiceConfig;

  const mockToConfiguration: jest.Mock = jest.fn().mockImplementation(() => {
    return {};
  });
  (serviceConfig.springBootAdminUrl.toConfiguration as jest.Mock) = mockToConfiguration;

  const registration = {
    name: SPRING_BOOT_CLIENT_URL.hostname,
    serviceUrl: SPRING_BOOT_CLIENT_URL.origin,
    healthUrl: SPRING_BOOT_CLIENT_URL.origin + "/health",
    metadata: {
      start: expect.any(String),
      description: "test-description",
      about: SPRING_BOOT_CLIENT_URL.origin + "/about",
      "written in": "TypeScript",
    },
  } as RegistrationInfo;

  let mockConsoleGroup: jest.SpyInstance;

  afterAll(() => {
    mockConsoleGroup.mockRestore();
  });

  afterEach(() => {
    mockConsoleGroup.mockClear();
  });

  beforeEach(() => {
    jest.resetModules();
    mockConsoleGroup = jest.spyOn(console, "group");
  });

  it("should call server and not fail on valid response", async () => {
    mockCreateInstances = jest.fn(() =>
      Promise.resolve({
        headers: {
          location: "test-headers-location",
        },
        config: {
          data: "{}",
        },
      }),
    );

    await callAdminServer(serviceConfig, registration);

    expect(SpringBootAdminServerApi.SpringBootAdminServerApiFactory).toHaveBeenCalledWith({});
    expect(mockCreateInstances).toHaveBeenCalledWith(registration);
    expect(mockConsoleGroup).toHaveBeenCalledWith(`Component ${registration.name} was registered`);
  });

  it("should call server and not fail on error response", async () => {
    mockCreateInstances = jest.fn(() =>
      Promise.reject({
        message: "test-error",
        config: {
          data: "{}",
        },
      }),
    );

    expect(async () => {
      await callAdminServer(serviceConfig, registration);
    }).not.toThrow(TypeError);
  });
});
