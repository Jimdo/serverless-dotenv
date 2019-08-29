'use strict';

const collectFunctionEnvVariables = require('../../src/lib/collectFunctionEnvVariables.js');

describe('collectFunctionEnvVariables', () => {
  let serverless;
  let expectedEnvVars;

  beforeAll(() => {
    serverless = {
      service: {
        functions: {
          test1: {
            environment: {
              'TEST1_ENV_VAR': 'value123',
            },
          },
          test2: {
            environment: {
              'TEST2_ENV_VAR': 'value123',
            },
          },
          test3: {},
        },
      },
    };

    expectedEnvVars = {
      'TEST1_ENV_VAR': 'value123',
      'TEST2_ENV_VAR': 'value123',
    };
  });

  it('should return an object with the environment variables', () => {
    const envVars = collectFunctionEnvVariables(serverless);

    expect(envVars).toEqual(expectedEnvVars);
  });

  it('should not break if no functions defined', () => {
    const serverlessWithoutFunctions = {
      service: {},
    };
    const envVars = collectFunctionEnvVariables(serverlessWithoutFunctions);

    expect(envVars).toEqual({});
  });
});
