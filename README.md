# Fleabag Quotes API

![main branch](https://github.com/livkndt/fleabag-quotes/actions/workflows/nodejs.yml/badge.svg)

Fleabag quotes API. Cheeky little REST API built on Node.js and Express using TypeScript.
Designed to return random quotes from the critically acclaimed TV series, "Fleabag", for your amusement.

https://fleabag-quotes-6072411c0ec5.herokuapp.com/quotes/random

## API Usage

The API includes several endpoints to interact with:

- `GET /quotes/random`: Returns a random quote from any character in the show.
- `GET /quotes/characters`: Returns a list of all the characters who have quotes available.
- `GET /quotes/random/inspirational`: Returns a random quote from any character in the show as an inspirational 400x400 png image.
- `GET /quotes/:id`: Returns a quote from the show by numeric quote id.
- `GET /quotes/:id/inspirational`: Returns a quote from the show by numeric quote id as an inspirational 400x400 png image.
- `GET /quotes/characters/:character`: Returns all the quotes from a specific character.
- `GET /quotes/characters/:character/random`: Returns a random quote from a specific character.

## Development

### Pre-requisites

- Node (v18.17.0)
- npm (v9.6.7)

## Libraries

A note on some of the libraries used to ensure high-quality code:

- Husky: Husky is used to manage git hooks. It helps to prevent bad git commit, git push, and more by automatically running tasks (like tests, linting checks, etc.) before these actions are completed. This ensures that any issues are caught and fixed before they become a problem.

- commitlint: Commitlint is paired with Husky to enforce a consistent commit style. This improves readability and navigability of the project's history.

- Prettier: Prettier is an opinionated code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules. This takes the burden of maintaining a consistent style guide off of the developers and ensures that the project's code is clean and easy-to-read.

- lint-staged: lint-staged is used alongside Husky and Prettier to only run Prettier on staged files. This makes commits more efficient and ensures that only files that are about to be committed are formatted, saving time and processing power.

## CI

Tests are run on every push to the main branch using GitHub Actions.

## Deployment

This app can be easily deployed to Heroku.

```shell
$ heroku login
$ cd fleabag-quotes/
$ heroku create your-app-name
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app your-app-name
$ git push heroku main
```

### Installation

You'll need Node.js and npm installed on your computer to run this application; follow instructions for your own OS.

To install the application:

Clone the repository to your local machine.
Navigate to the project folder and install dependencies using npm install.

```bash
$ git clone https://github.com/livkndt/fleabag-quotes.git
$ npm install
```

### Test

Tests are written using Jest and Supertest. To run the tests:

```bash
$ npm test
```

### Run

You can run the application locally using the following command, using nodemon to watch for changes:

```bash
$ npm run dev
> fleabag-quotes@1.0.0 dev
> nodemon

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,js
[nodemon] starting `ts-node ./src/server.ts`
Listening on port: 3000
```

### Build

This application is written in TypeScript, so it needs to be compiled to JavaScript before it can be run.

Build the project by running npm run build. This will compile the TypeScript code into JavaScript in the dist folder.
Start the server using npm start.

### Contributing

We welcome contributions! If you notice a bug, want to add a feature, or think there's something that could be improved,
feel free to fork the repository and submit a pull request, or raise an issue.
