# Fleabag Quotes API

![main branch](https://github.com/livkndt/fleabag-quotes/actions/workflows/nodejs.yml/badge.svg)

💬 Fleabag quotes API. Cheeky little REST API built on Node.js and Express using TypeScript.
Designed to return random quote from the critically acclaimed TV series, "Fleabag", for your amusement.

## Demo

### API on Heroku

https://fleabag-quotes-6072411c0ec5.herokuapp.com/quotes/random

### Random inspirational quote image

<img src="https://fleabag-quotes-6072411c0ec5.herokuapp.com/quotes/random/inspirational"
alt="inspirational quote" width="400" />

## API Usage

The API includes several endpoints to interact with.

You can see them all via the Swagger UI: https://fleabag-quotes-6072411c0ec5.herokuapp.com/api-docs/

## Development

### Pre-requisites

- Node (v18.x)
- npm (v9.x)

## Libraries

A note on some of the libraries used to ensure high-quality code:

- Husky: `husky` is used to manage git hooks. It helps to prevent bad git commit, git push, and more by automatically
  running tasks (like tests, linting checks, etc.) before these actions are completed. This ensures that any issues are
  caught and fixed before they become a problem.

- Commitlint: `commitlint` is paired with Husky to enforce a consistent commit style using conventional commits.
  This improves readability and navigability of the repo history.

- Prettier: `prettier` is an opinionated code formatter that enforces a consistent style by parsing your code and
  re-printing it with its own rules. This takes the burden of maintaining a consistent style guide off developers and
  ensures that the repo code is clean and easy-to-read.

- Lint Staged: `lint-staged` is used alongside Husky and Prettier to only run Prettier on staged files. This makes
  commits more efficient and ensures that only files that are about to be committed are formatted, saving time and
  processing power.

- Jest: `jest` is a JavaScript testing framework that is used to run unit tests. It is fast, easy to use, and
  provides a great experience for developers.

- Supertest: `supertest` is a library for testing HTTP requests, used to test the API endpoints.

- Swagger: `swagger-ui-express` and `swagger-jsdoc` are used to serve the Swagger API documentation.

- Swagger AutoGen: `swagger-autogen` is used to generate the Swagger API documentation from the code.

- Canvas: `canvas` is used to generate the inspirational quote images.

- Helmet: `helmet` is a collection of 14 smaller middleware functions that set HTTP response headers. It helps to
  secure the API by setting various HTTP headers.

- Express Rate Limit: `express-rate-limit` is a simple Node.js rate-limiting middleware. It is used to limit
  repeated requests to public APIs for security purposes.

- Nodemon: `nodemon` is used to watch for changes in the code and automatically restart the server. It makes dev work
  quicker and easier ✌️

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

The "Automatic deploys" feature of Heroku is used; Heroku is connected via Github, and automatically deploys the app
when changes are pushed to the main branch & the CI has run successfully.

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

### Generating Swagger API docs

As of writing, the Swagger API docs are generated manually using the following command:

```bash
$ npm run swagger-autogen
```

Then, when the server is running, you can view the docs at: http://localhost:3000/api-docs/

```bash
$ npm run dev
```

### Build

This application is written in TypeScript, so it needs to be compiled to JavaScript before it can be run.

Build the project by running `npm run build`. This will compile the TypeScript code into JavaScript in the dist folder.
Start the server using npm start.

### Contributing

We welcome contributions! If you notice a bug 🐞, want to add a feature ✨, or think there's something that could be
improved 🛠️, feel free to fork the repository and submit a pull request, or raise an issue 🤚.
