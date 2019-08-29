[![Maintainability](https://api.codeclimate.com/v1/badges/64a8a9858c497e6f6900/maintainability)](https://codeclimate.com/github/UnlyEd/serverless-env-copy-plugin/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64a8a9858c497e6f6900/test_coverage)](https://codeclimate.com/github/UnlyEd/serverless-env-copy-plugin/test_coverage)
[![AWS CodeBuild](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiQ0VXT2gwOEx4cXRhZ09aRzlKa0ZuN04vbGZSNyt0Sk9WZWk2bWlCRitEcmlQMTcrKzI5ZWpXUXpqQUxPd1hpZXM0UGRuTlNObzVTSlZ5MFRkbnFOc1RNPSIsIml2UGFyYW1ldGVyU3BlYyI6ImlXS01adG04bGdsYURWZW0iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/projects/Serverless-env-copy-plugin)

# ⚡️ Serverless-env-copy-plugin

> This plugin [was forked](https://github.com/Jimdo/serverless-dotenv) because the original repo isn't maintained.
> Also, the name of the plugin was changed, because the original name didn't make sense to us.

<!-- toc -->

- [About the plugin](#about-the-plugin)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)
  * [Test](#test)
  * [Versions](#versions)
    + [SemVer](#semver)
    + [Release a new version](#release-a-new-version)
  * [Releasing and publishing](#releasing-and-publishing)
- [License](#license)

<!-- tocstop -->

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


---

## Contributing

We gladly accept PRs, but please open an issue first so we can discuss it beforehand.

### Test

```
yarn test # Run all tests, interactive and watch mode
yarn test:once # Used for CI/CD
yarn test:coverage # Generate coverage report
```

### Versions

#### SemVer

We use Semantic Versioning for this project: https://semver.org/. (`vMAJOR.MINOR.PATCH`: `v1.0.1`)

- Major version: Must be changed when Breaking Changes are made (public API isn't backward compatible).
  - A function has been renamed/removed from the public API
  - Something has changed that will cause the app to behave differently with the same configuration
- Minor version: Must be changed when a new feature is added or updated (without breaking change nor behavioral change)
- Patch version: Must be changed when any change is made that isn't either Major nor Minor. (Misc, doc, etc.)

#### Release a new version

- `yarn run release`

This command will prompt you for the version to update to, create a git tag, build the files and commit/push everything automatically.

> Don't forget we are using SemVer, please follow our SemVer rules.

**Pro hint**: use `beta` tag if you're in a work-in-progress (or unsure) to avoid releasing WIP versions that looks legit


### Releasing and publishing

```
yarn releaseAndPublish # Shortcut - Will prompt for bump version, commit, create git tag, push commit/tag and publish to NPM

yarn release # Will prompt for bump version, commit, create git tag, push commit/tag
npm publish # Will publish to NPM
```

## License

MIT
