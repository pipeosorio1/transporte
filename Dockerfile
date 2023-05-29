FROM node:16.15.1-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN yarn install

ENTRYPOINT [ "yarn", "start:dev" ]

COPY . .

FROM node:16.15.1-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16.15.1-alpine AS production

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN yarn install --only=production

COPY --from=build /app/dist /app/dist

ENTRYPOINT [ "yarn", "start:prod" ]

COPY . .