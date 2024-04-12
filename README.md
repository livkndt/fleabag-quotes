# Fleabag Quotes API

![main branch](https://github.com/livkndt/fleabag-quotes/actions/workflows/nodejs.yml/badge.svg)

💬 Fleabag quotes API. Cheeky little REST API built on Node.js and Express using TypeScript.
Designed to return random quote from the critically acclaimed TV series, "Fleabag", for your amusement.

## Demo

### Random quote

https://fleabag-quotes.livkndt.com/quotes/random

### Random inspirational quote image

<img src="https://fleabag-quotes.livkndt.com/quotes/random/inspirational"
alt="inspirational quote" width="400" />

## API Usage

The API includes several endpoints to interact with.

You can see them all via the Swagger UI: https://fleabag-quotes.livkndt.com/

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

## Installation

You'll need Node.js and npm installed on your computer to run this application; follow instructions for your own OS.

To install the application:

Clone the repository to your local machine.
Navigate to the project folder and install dependencies using npm install.

```bash
$ git clone https://github.com/livkndt/fleabag-quotes.git
$ npm install
```

## Test

Tests are written using Jest and Supertest. To run the tests:

```bash
$ npm test
```

## Run

You can run the application locally using the following command, using nodemon to watch for changes:

```bash
$ npm run dev
> fleabag-quotes@1.0.0 dev
> nodemon

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,js
[nodemon] starting `ts-node ./src/index.ts`
Listening on port: 3000
```

## Generating Swagger API docs

As of writing, the Swagger API docs are generated manually using the following command:

```bash
$ npm run swagger-autogen
```

Then, when the server is running, you can view the docs at: http://localhost:3000/

```bash
$ npm run dev
```

## Build

This application is written in TypeScript, so it needs to be compiled to JavaScript before it can be run.

Build the project by running `npm run build`. This will compile the TypeScript code into JavaScript in the dist folder.
Start the server using npm start.

## Deployment

### Heroku

This app can be easily deployed to Heroku.

```shell
$ heroku login
$ cd fleabag-quotes/
$ heroku create your-app-name
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app your-app-name
$ git push heroku main
```

The "Automatic deploys" feature of Heroku is used; Heroku is connected via GitHub, and automatically deploys the app
when changes are pushed to the main branch & the CI has run successfully.

### Vercel

This app is currently deployed using Vercel, and the repo contains relevant configuration to do so.

I had a real struggle getting a node/ts/express app deployed on Vercel, the current configuration works for now but may
not be optimal. There are a few key things to note:

- `vercel.json` contains the configuration for the Vercel deployment.
- I would not normally commit my build files (under `/dist`) to git, however Vercel requires compiled JS to work, I
  thought Vercel did this as part of the build process however I
  couldn't find a working configuration for the life of me otherwise). I got this tip from
  a [dev.to](https://dev.to/tirthpatel/deploy-node-ts-express-typescript-on-vercel-284h) article.
- Vercel also seems to rely on having an `index.js` file. I used to have a `server.js` as the starting point for the
  app, so I had to rename it to get it working.
- For this reason, I am using a pre-commit hook to compile the TypeScript code before committing, to ensure that the
  build files are always up-to-date:
    ```json
      // package.json
      "pre-commit": [
        "ts-check",
        "build",
        "add-build"
      ],
    ```
- I also ran into an issue with the swagger UI. I ultimately found that I needed to downgrade my version
  of `swagger-ui-express` to `4.3.0` - in newer versions the UI is totally broken.
- In addition, I needed to grab the swagger UI CSS from the CDN and pass it to swagger using the `customCssUrl` option,
  otherwise the styling is broken:
  ```typescript
    // app.ts
    const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));
  ```

## Contributing

We welcome contributions! If you notice a bug 🐞, want to add a feature ✨, or think there's something that could be
improved 🛠️, feel free to fork the repository and submit a pull request, or raise an issue 🤚.
