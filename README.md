# Serverless Plugin Dotenv

[![npm](https://img.shields.io/npm/v/@jimdo/serverless-dotenv.svg)](https://www.npmjs.com/package/@jimdo/serverless-dotenv)
[![license](https://img.shields.io/github/license/jimdo/serverless-dotenv.svg)](https://github.com/jimdo/serverless-dotenv/blob/master/LICENSE)
[![Coveralls](https://img.shields.io/coveralls/jimdo/serverless-dotenv.svg)](https://coveralls.io/github/jimdo/serverless-dotenv)

## About the plugin

This serverless plugin generates a `.env` file based on the environment variables in the `serverless.yml`. The idea is to use this environment variables for further tasks like integration tests etc. It works great with `serverless offline`, so you can start serverless offline, the plugin will hook into the process and create the `.env` file. You will find the `.env` file in the `.serverless` folder of your project.

It will collect the global environment variables of the poject as well as all environment variables of the functions. It will also add `API_ENDPOINT` and `IS_OFFLINE` to your environment if you run the plugin via `serverless offline`.

## Usage

Add the npm package to your project:

```bash
# Via yarn
$ yarn add @jimdo/serverless-dotenv

# Via npm
$ npm instal @jimdo/serverless-dotenv --save
```

Add the plugin to your `serverless.yml`:

```yaml
plugins:
  - '@jimdo/serverless-dotenv'
```

That's it! You can now type `serverless dotenv` in your terminal to generate the `.env` file based on your serverless configuration. Alternative you can just start `serverless offline` to generate it.

## Contribution

Feel free to contribute to this project! Our JavaScript is written based on [standardJS](https://standardjs.com). We recommend to use a `standardJS` [plugin](https://standardjs.com/index.html#are-there-text-editor-plugins) for your Editor, but you can also lint your code with `yarn run lint` - respectively `npm run lint`. Please don't forget to add unit and/or integration tests. Thanks <3
