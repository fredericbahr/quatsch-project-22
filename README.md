# QUAtsCH-project-22

## Project structure

The project is structured as follows:

- `apps/action-server` contains the code for the custom action server that is used by the chatbot to execute actions.
- `apps/frontend` contains the frontend code for serving an UI to interact with the chatbot.
- `apps/rasa` contains the code for the chatbot based on the rasa framework (actions, nlu, stories, ...).

The dependencies of the apps are located in the `packages` directory as in other multi-package repositories.

## Installation

### Install with Docker (Recommended)

#### Prerequisites

- You need to have a working installation of [Docker](https://docs.docker.com/install/)
  and [Docker Compose](https://docs.docker.com/compose/install/).

##### Build and start the applications

- Run `docker compose up` to start rasa, the action-server and the frontend.

### Install with Node (Partially)

#### Prerequisites

- You need to have a working installation of [Docker](https://docs.docker.com/install/).
- You need to have a working installation of [Volta](https://docs.volta.sh/guide/getting-started).

##### Initialize

- Run `npm run init` to initialize the project, which includes installing the dependencies and running the build
  scripts.

#### Commands

The following scripts are the main executable scripts in the umbrella package. All scripts are mappings to turbo, so
arguments can be passed to [turbo](https://turbo.build/repo/docs/core-concepts/monorepos/filtering), for
example: `npm run lint -- --filter=rasa`.

| Command              | Description                                                |
|----------------------|------------------------------------------------------------|
| `npm run build`      | Creates the artifacts of the respective package            |
| `npm run clean`      | Removes the created artifacts and temporary files          |
| `npm run dev`        | Starts the applications and services in a development mode |
| `npm run format`     | Checks the formatting of the source files                  |
| `npm run format:fix` | Fixes the formatting of the source files if possible       |
| `npm run lint`       | Checks the quality of the source files                     |
| `npm run lint:fix`   | Fixes the quality of the source files if possible          |
| `npm run test`       | Runs the respective tests                                  |

#### Additional commands for Rasa

| Command             | Description                                            |
|---------------------|--------------------------------------------------------|
| `npm run shell`     | Runs the Rasa shell in a Docker container              |
| `npm run train`     | Creates the Rasa models in a Docker container          |
| `npm run visualize` | Creates a visualization of the Rasa stories as a graph |

#### Additional commands for e2e

| Command       | Description                   |
|---------------|-------------------------------|
| `npm run e2e` | Executes the end-to-end tests |

## Rasa Chatbot Example

- https://github.com/RasaHQ/rasa-demo

## Quicklinks

- [YouTube](https://www.youtube.com/watch?v=ZhRo3gfLk90)
- [Rasa chatbot widgets selection](https://forum.rasa.com/t/which-rasa-chatbot-widget-to-use/48616)
- [UI Tool](https://botfront.io/)
- [Sara - Rasa Demo Bot](https://github.com/RasaHQ/rasa-demo)
- [Stations](https://lupo-cloud.de/air-app/stations)