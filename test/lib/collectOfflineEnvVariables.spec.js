'use strict'

const collectOfflineEnvVariables = require('../../src/lib/collectOfflineEnvVariables.js')

describe('collectOfflineEnvVariables', () => {
  let serverless

  beforeAll(() => {
    serverless = {
      service: {
      }
    }
  })

  describe('default options', () => {
    it('should return environment variables for serverless offline', () => {
      const expectedEnvVars = {
        IS_OFFLINE: true,
        API_ENDPOINT: 'http://localhost:3000/'
      }

      expect(collectOfflineEnvVariables(serverless)).toEqual(expectedEnvVars)
    })
  })

  describe('https protocol', () => {
    it('should return api endpoint with https', () => {
      const expectedEnvVars = {
        IS_OFFLINE: true,
        API_ENDPOINT: 'https://localhost:3000/'
      }

      const options = {
        httpsProtocol: '/path/to/certificates'
      }

      expect(collectOfflineEnvVariables(serverless, options)).toEqual(expectedEnvVars)
    })
  })

  describe('prefix', () => {
    it('should be part of the path in API_ENDPOINT', () => {
      const expectedEnvVars = {
        IS_OFFLINE: true,
        API_ENDPOINT: 'http://localhost:3000/v1/'
      }

      const options = {
        prefix: 'v1'
      }

      expect(collectOfflineEnvVariables(serverless, options)).toEqual(expectedEnvVars)
    })
  })

  describe('serverless config yaml', () => {
    it('should override defaults', () => {
      serverless = {
        service: {
          custom: {
            'serverless-offline': {
              port: 3001
            }
          }
        }
      }

      const expectedEnvVars = {
        IS_OFFLINE: true,
        API_ENDPOINT: 'http://localhost:3001/'
      }

      expect(collectOfflineEnvVariables(serverless)).toEqual(expectedEnvVars)
    })
  })
})
