## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# e2e tests
$ yarn run test:e2e
```

## Running the Docker mode

```bash
# development
$ docker-compose up -d --build

# production mode
$ docker-compose -f docker-compose.production.yml up -d --build

# test
$ docker compose exec transporte yarn run test:e2e
```
