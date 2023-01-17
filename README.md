# QUAtsCH-project-22

## Prerequisites

- You need to have a working installation of [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).
- You need to have a working installation of [Node.js](https://nodejs.org/en/download/) v.18.12+ and [npm](https://www.npmjs.com/get-npm) v8.19+.

## Project structure

The project is structured as follows:

- `frontend` contains the frontend code for serving an UI to interact with the chatbot.
- `rasa` contains the code for the chatbot based on the rasa framework (actions, nlu, stories, ...).
- `action-server` contains the code for the custom action server that is used by the chatbot to execute actions.

## Installation

Nothing needs to be done here

## Start

Run `docker compose up` to start the chatbot, the action-server and the frontend.

## Rasa Chatbot Example

- https://github.com/RasaHQ/rasa-demo

## Quicklinks

- [YouTube](https://www.youtube.com/watch?v=ZhRo3gfLk90)
- [Rasa chatbot widgets selection](https://forum.rasa.com/t/which-rasa-chatbot-widget-to-use/48616)
- [UI Tool](https://botfront.io/)