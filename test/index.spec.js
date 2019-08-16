'use strict'

const fs = require('fs')
const path = require('path')

const ServerlessDotenvPlugin = require('../src/index.js')

describe('serverless dotenv plugin', () => {
  let serverless
  let pluginInstance
  let expectedEnvVars

  beforeEach(() => {
    serverless = {
      service: {
        provider: {
          environment: {
            GLOBAL_VAR: 'test'
          }
        },
        functions: {
          test1: {
            environment: {
              TEST1_ENV_VAR: 'value123'
            }
          },
          test2: {
            environment: {
              TEST2_ENV_VAR: 'value123'
            }
          },
          test3: {
          }
        }
      },
      cli: {
        log: jest.fn()
      },
      config: {
        servicePath: '/tmp/serverlessDotenvPlugin/'
      }
    }

    expectedEnvVars = 'GLOBAL_VAR=test\r\n'
    expectedEnvVars += 'TEST1_ENV_VAR=value123\r\n'
    expectedEnvVars += 'TEST2_ENV_VAR=value123\r\n'

    pluginInstance = new ServerlessDotenvPlugin(serverless, {})
  })

  describe('starting plugin', () => {
    it('should log informations', () => {
      pluginInstance.dotenvHandler()

      expect(serverless.cli.log).toHaveBeenCalledWith('Creating .env file...')
    })
  })

  describe('.env file', () => {
    it('should write .env file', () => {
      pluginInstance.dotenvHandler()

      const dotEnvFile = path.join(serverless.config.servicePath, '.serverless/.env')
      const dotEnvDocument = fs.readFileSync(dotEnvFile)

      expect(dotEnvDocument.toString('ascii')).toEqual(expectedEnvVars)
    })

    it('should write .env file to a custom location', () => {
      pluginInstance.options.path = 'tmp/custom/path'
      pluginInstance.dotenvHandler()

      const dotEnvFile = path.join('tmp/custom/path', '.env')
      const dotEnvDocument = fs.readFileSync(dotEnvFile)

      expect(dotEnvDocument.toString('ascii')).toEqual(expectedEnvVars)
    })

    it('should write .env file to a custom location set in serverless.yaml custom config', () => {
      serverless.service.custom = {dotenv: 'tmp/custom/path'}
      pluginInstance.dotenvHandler()

      const dotEnvFile = path.join('tmp/custom/path', '.env')
      const dotEnvDocument = fs.readFileSync(dotEnvFile)

      expect(dotEnvDocument.toString('ascii')).toEqual(expectedEnvVars)
    })

    it('should append offline variables when hooked', () => {
      serverless.pluginManager = {
        run: () => pluginInstance.dotenvHandler()
      }

      pluginInstance.initOfflineHook()

      const dotEnvFile = path.join(serverless.config.servicePath, '.serverless/.env')
      const dotEnvDocument = fs.readFileSync(dotEnvFile)

      expect(dotEnvDocument.toString('ascii')).toMatch('IS_OFFLINE')
      expect(dotEnvDocument.toString('ascii')).toMatch('API_ENDPOINT')
    })
  })
})
