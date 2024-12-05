import configuration from '../../src/config/configuration';

describe('Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  it('should return configuration with valid environment variables', () => {
    process.env['PORT'] = '8000';
    process.env['MONGODB_CONNECTION_STRING'] =
      'mongodb://localhost:27017/<database>';

    const config = configuration();

    expect(config).toEqual({
      app: {
        port: 8000,
      },
      database: {
        mongoConnectionString: 'mongodb://localhost:27017/<database>',
      },
    });
  });

  it('should throw an error if ENV is not set', () => {
    process.env['PORT'] = '8000';

    expect(() => configuration()).toThrow(
      'Environment variable MONGODB_CONNECTION_STRING is not set',
    );
  });
});
