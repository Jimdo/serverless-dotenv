'use strict';

const util = require('util');

function transformEnvVarsToString(environmentVariables) {
  let dotEnvDocument = '';

  Object.keys(environmentVariables).forEach(envVar => {
    dotEnvDocument += util.format('%s=%s\r\n', envVar, environmentVariables[envVar]);
  });

  return dotEnvDocument;
}

module.exports = transformEnvVarsToString;
