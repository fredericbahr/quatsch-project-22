FROM node:18

USER node

WORKDIR /usr/local/apps/quatsch/action-server

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]