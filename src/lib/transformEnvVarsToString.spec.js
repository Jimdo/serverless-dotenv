
const transformEnvVarsToString = require('./transformEnvVarsToString.js');

describe('transformEnvVarsToString', () => {
  let environment;
  let expectedString = '';

  beforeAll(() => {
    environment = {
      TEST1_ABC: 'value123',
      TEST2_ABC: 'value321',
    };

    expectedString += 'TEST1_ABC=value123\r\n';
    expectedString += 'TEST2_ABC=value321\r\n';
  });

  it('should return environment variables as string', () => {
    const envVarsString = transformEnvVarsToString(environment);

    expect(envVarsString).toEqual(expectedString);
  });
});
