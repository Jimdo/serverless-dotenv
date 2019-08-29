
function collectFunctionEnvVariables(serverless) {
  const functions = serverless.service.functions || {};
  let environmentVariables = {};

  Object.keys(functions).forEach((func) => {
    const { environment } = functions[func];

    environmentVariables = { ...environmentVariables, ...environment };
  });

  return environmentVariables;
}

module.exports = collectFunctionEnvVariables;
