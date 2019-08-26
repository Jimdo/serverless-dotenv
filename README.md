[![Maintainability](https://api.codeclimate.com/v1/badges/64a8a9858c497e6f6900/maintainability)](https://codeclimate.com/github/UnlyEd/serverless-env-copy-plugin/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64a8a9858c497e6f6900/test_coverage)](https://codeclimate.com/github/UnlyEd/serverless-env-copy-plugin/test_coverage)
[![AWS CodeBuild](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiQ0VXT2gwOEx4cXRhZ09aRzlKa0ZuN04vbGZSNyt0Sk9WZWk2bWlCRitEcmlQMTcrKzI5ZWpXUXpqQUxPd1hpZXM0UGRuTlNObzVTSlZ5MFRkbnFOc1RNPSIsIml2UGFyYW1ldGVyU3BlYyI6ImlXS01adG04bGdsYURWZW0iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/projects/Serverless-env-copy-plugin)

# ⚡️ Serverless-env-copy-plugin

## About the plugin

This serverless plugin generates a `.env` file based on the environment variables in the `serverless.yml`. The idea is to use this environment variables for further tasks like integration tests etc. It works great with `serverless offline`, so you can start serverless offline, the plugin will hook into the process and create the `.env` file. You will find the `.env` file in the `.serverless` folder of your project.

It will collect the global environment variables of the poject as well as all environment variables of the functions. It will also add `API_ENDPOINT` and `IS_OFFLINE` to your environment if you run the plugin via `serverless offline`.

## Usage

Add the npm package to your project:

```bash
# Via yarn
$ yarn add @unly/serverless-env-copy-plugin

# Via npm
$ npm instal @unly/serverless-env-copy-plugin --save
```

Add the plugin to your `serverless.yml`:

```yaml
plugins:
  - '@unly/serverless-env-copy-plugin'
```

That's it! You can now type `serverless dotenv` in your terminal to generate the `.env` file based on your serverless configuration. Alternative you can just start `serverless offline` to generate it.

## Example

You can check https://github.com/UnlyEd/boilerplates-generator/tree/master/templates/node-v10.x-aws-serverless to get an example of this plugin

## Contribution

Feel free to contribute to this project! Our JavaScript is written based on [standardJS](https://standardjs.com). We recommend to use a `standardJS` [plugin](https://standardjs.com/index.html#are-there-text-editor-plugins) for your Editor, but you can also lint your code with `yarn run lint` - respectively `npm run lint`. Please don't forget to add unit and/or integration tests. Thanks <3
