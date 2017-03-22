'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const util = require('util')

class DotEnvPlugin {
  constructor (serverless) {
    this.serverless = serverless

    this.commands = {
      dotenv: {
        usage: 'Create .env file with serverless environment variables',
        lifecycleEvents: [
          'init',
          'collectGlobalEnvVariables',
          'collectFunctionEnvVariables',
          'appendOfflineVariables',
          'writeDotEnvFile'
        ]
      }
    }

    this.hooks = {
      'before:offline:start:init': () => this.serverless.pluginManager.run(['dotenv']),
      'dotenv:init': this.init.bind(this),
      'dotenv:collectGlobalEnvVariables': this.collectGlobalEnvVariables.bind(this),
      'dotenv:collectFunctionEnvVariables': this.collectFunctionEnvVariables.bind(this),
      'dotenv:appendOfflineVariables': this.appendOfflineVariables.bind(this),
      'dotenv:writeDotEnvFile': this.writeDotEnvFile.bind(this)
    }

    this.environmentVariables = {}
  }

  init () {
    this.serverless.cli.log('Creating .env file...')
  }

  collectGlobalEnvVariables () {
    this._collectEnvVariables(this.serverless.service.provider.environment)
  }

  collectFunctionEnvVariables () {
    const functions = this.serverless.service.functions

    Object.keys(functions).forEach(func => this._collectEnvVariables(functions[func].environment))
  }

  appendOfflineVariables () {
    this.environmentVariables['IS_OFFLINE'] = true
    this.environmentVariables['API_ENDPOINT'] = 'http://localhost:3000'
  }

  writeDotEnvFile () {
    mkdirp.sync('.serverless')

    const path = util.format('%s/.serverless/.env', this.serverless.config.servicePath)
    let dotEnvDocument = ''

    Object.keys(this.environmentVariables).forEach(envVar => {
      dotEnvDocument += util.format('%s=%s\r\n', envVar, this.environmentVariables[envVar])
    })

    fs.writeFileSync(path, dotEnvDocument)
  }

  _collectEnvVariables (environment) {
    Object.keys(environment || {}).forEach(envVar => {
      this.environmentVariables[envVar] = environment[envVar]
    })
  }
}

module.exports = DotEnvPlugin
