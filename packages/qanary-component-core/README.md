# Qanary Component Core (TypeScript)

This project provides a core component for the Qanary framework. It is written in TypeScript and can be used as a starting point for new custom components.

## Core Functionality

The core component provides the following functionality:

- basic routes for the Spring Boot Admin server
- a REST endpoint for the Qanary pipeline to communicate with the component
- a mechanism to register new components at the Spring Boot Admin server

## Installation

The core component can be installed as a npm package:

```bash
npm install qanary-component-core
```

## Usage

The core component can be used as a framework for new custom components. The following example shows how to create a new component:

```typescript
import {
    QanaryComponentCore,
    IQanaryComponentCoreOptions,
    IQanaryComponentCoreDescription,
    IQanaryComponentCoreRequestHandler,
    IQanaryComponentCoreServiceConfig
} from 'qanary-component-core';

const config: IQanaryComponentCoreServiceConfig = {
  springBootAdminServerUrl: "http://localhost:8080/",
  springBootAdminServerUser: "admin",
  springBootAdminServerPassword: "admin",
  serviceName: "my-component",
  servicePort: 5000,
  serviceHost: "http://localhost",
  serviceDescription: "my-component is doing some magic",
};

const handler: IQanaryComponentCoreRequestHandler = (req, res) => {
    // implement your component logic here
    // e.g get the question and return some analysis
    // write back the results into the graph/triplestore
};

const description: IQanaryComponentCoreDescription = {
    name: "my-component",
    description: "my-component is doing some magic",
    version: "0.0.1",
};

const options: IQanaryComponentCoreOptions = {
    config,
    handler,
    description,
}

// automatically registers the component at the Spring Boot Admin server
const myComponent = QanaryComponentCore(options);
```

## API

### IQanaryComponentCoreOptions

| Property    | Type                                 | Description                       |
| ----------- | ------------------------------------ | --------------------------------- |
| config      | `IQanaryComponentCoreConfig`         | Configuration of the component    |
| handler     | `IQanaryComponentCoreRequestHandler` | Request handler for the component |
| description | `IQanaryComponentCoreDescription`    | Description of the component      |

### IQanaryComponentCoreConfig

| Property                      | Type     | Description                               |
| ----------------------------- | -------- | ----------------------------------------- |
| springBootAdminServerUrl      | `string` | URL of the Spring Boot Admin server       |
| springBootAdminServerUser     | `string` | User for the Spring Boot Admin server     |
| springBootAdminServerPassword | `string` | Password for the Spring Boot Admin server |
| serviceName                   | `string` | Name of the component                     |
| servicePort                   | `number` | Port of the component                     |
| serviceHost                   | `string` | Host of the component                     |
| serviceDescription            | `string` | Description of the component              |

### IQanaryComponentCoreDescription

| Property    | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| name        | `string` | Name of the component        |
| description | `string` | Description of the component |
| version     | `string` | Version of the component     |

### IQanaryComponentCoreRequestHandler

| Property | Type                                    | Description                      |
| -------- | --------------------------------------- | -------------------------------- |
| req      | `Request<never, never, IQanaryMessage>` | Request object of the component  |
| res      | `Response<IQanaryMessage>`              | Response object of the component |

### IQanaryMessage

| Property | Type     | Description                |
| -------- | -------- | -------------------------- |
| endpoint | `string` | URI of the sparql endpoint |
| inGraph  | `string` | URI of the incoming graph  |
| outGraph | `string` | URI of the outgoing graph  |
