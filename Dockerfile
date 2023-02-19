# Monorepo Docker

FROM node:alpine AS installer
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm install --global turbo

# Set working directory
WORKDIR /app

# Install dependencies
COPY . .
RUN npm run init
