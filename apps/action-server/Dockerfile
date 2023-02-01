FROM node:18-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm install --global turbo

WORKDIR /app

# Install dependencies
COPY . .
RUN npm ci

RUN turbo prune --scope=action-server --docker

# Note: Don't expose ports here, Compose will handle that for us

# Startdevelopment mode
CMD turbo run dev --scope=action-server
