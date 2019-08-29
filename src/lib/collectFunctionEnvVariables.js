'use strict';

function collectFunctionEnvVariables(serverless) {
  const functions = serverless.service.functions || {};
  let environmentVariables = {};

  Object.keys(functions).forEach(func => {
    const environment = functions[func].environment;

    environmentVariables = Object.assign({}, environmentVariables, environment);
  });

  return environmentVariables;
}

module.exports = collectFunctionEnvVariables;
