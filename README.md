<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Meal Management Application.

## Description

This is a backend API for a meal management application that allows users to create, read, update, and delete meal addons. The API should also allow users to create categories for these addons.

The API should have the following endpoints:

- **POST** `/brands/:brandId/addons`: Create a new meal addon for the specified brand. The request body should contain the following fields:

  - name: The name of the meal addon (string, required)
  - description: A description of the meal addon (string, optional)
  - price: The price of the meal addon (number, required)
  - category: The category of the meal addon (string, optional)
    <br>
    <br>

- **GET** `/brands/:brandId/addons`: Retrieve a list of all meal addons for the specified brand.
- **GET** `/brands/:brandId/addons/:addonId`: Retrieve a single meal addon by its ID for the specified brand.
  <br>
  <br>
- **PATCH** `/brands/:brandId/addons/:addonId`: Update a single meal addon by its ID for the specified brand.
  The request body should contain the following fields:
  - name: The updated name of the meal addon (string, optional)
  - description: The updated description of the meal addon (string, optional)
  - price: The updated price of the meal addon (number, optional)
  - category: The updated category of the meal addon (string, optional)
    <br>
    <br>
- **DELETE** `/brands/:brandId/addons/:addonId`: Delete a single meal addon by its ID for the specified brand.
- **POST** `/brands/:brandId/addon-categories`: Create a new category for meal addons for the specified
  brand. The request body should contain the following field:
  - name: The name of the category (string, required)

## Installation

```bash
$ npm install
```

## migrations and seeding of data

```bash
# run all migrations
npx knex migrate:latest

# seed default data
npx knex seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

NOTE: sample of environmental variable can be found in .env.example file
