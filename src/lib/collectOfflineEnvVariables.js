'use strict'

const util = require('util')

function collectOfflineEnvVariables (serverless, cliOptions) {
  // Based on serverless offline (https://github.com/dherault/serverless-offline/blob/master/src/index.js)

  const defaultOptions = {
    host: 'localhost',
    port: 3000,
    httpsProtocol: '',
    prefix: '/'
  }

  const serverlessConfigOptions = (serverless.service.custom || {})['serverless-offline']
  const options = Object.assign({}, defaultOptions, serverlessConfigOptions, cliOptions)

  // Prefix must start and end with '/'
  if (!options.prefix.startsWith('/')) options.prefix = `/${options.prefix}`
  if (!options.prefix.endsWith('/')) options.prefix += '/'

  const protocol = options.httpsProtocol.length > 0 ? 'https' : 'http'

  return {
    IS_OFFLINE: true,
    API_ENDPOINT: util.format('%s://%s:%s%s', protocol, options.host, options.port, options.prefix)
  }
}

module.exports = collectOfflineEnvVariables
