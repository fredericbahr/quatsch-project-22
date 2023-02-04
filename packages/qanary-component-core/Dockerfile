FROM node:18-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

RUN npm install --global turbo

WORKDIR /app

# Install dependencies
COPY . .
RUN npm run reinit

RUN turbo prune --scope=qanary-component-core --docker

# Note: Don't expose ports here, Compose will handle that for us

# Start development mode
CMD npm run dev -- --filter=qanary-component-core
