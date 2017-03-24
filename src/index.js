'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const collectFunctionEnvVariables = require('./lib/collectFunctionEnvVariables.js')
const collectOfflineEnvVariables = require('./lib/collectOfflineEnvVariables.js')
const transformEnvVarsToString = require('./lib/transformEnvVarsToString.js')

class ServerlessDotenvPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options

    this.commands = {
      dotenv: {
        usage: 'Create .env file with serverless environment variables',
        lifecycleEvents: [
          'dotenvHandler'
        ]
      }
    }

    this.hooks = {
      'before:offline:start:init': this.initOfflineHook.bind(this),
      'before:offline:start': this.initOfflineHook.bind(this),
      'dotenv:dotenvHandler': this.dotenvHandler.bind(this)
    }

    this.environmentVariables = {}
  }

  initOfflineHook () {
    this.IS_HOOKED = true

    this.serverless.pluginManager.run(['dotenv'])
  }

  dotenvHandler () {
    this.serverless.cli.log('Creating .env file...')

    // collect global environment variables
    const globalEnvironment = this.serverless.service.provider.environment
    this.environmentVariables = Object.assign(this.environmentVariables, globalEnvironment)

    // collect environment variables of functions
    const functionEnvironment = collectFunctionEnvVariables(this.serverless)
    this.environmentVariables = Object.assign(this.environmentVariables, functionEnvironment)

    // collect environment variables for serverless offline
    if (this.IS_HOOKED) {
      const offlineEnvVars = collectOfflineEnvVariables(this.serverless, this.options)
      this.environmentVariables = Object.assign(this.environmentVariables, offlineEnvVars)
    }

    // write .env file
    const dotEnvPath = path.join(this.serverless.config.servicePath, '.serverless')
    const dotEnvFile = path.join(this.serverless.config.servicePath, '.serverless/.env')
    const dotEnvDocument = transformEnvVarsToString(this.environmentVariables)

    mkdirp.sync(dotEnvPath)
    fs.writeFileSync(dotEnvFile, dotEnvDocument)
  }
}

module.exports = ServerlessDotenvPlugin
