export interface AppConfig {
  port: number;
}

export interface DatabaseConfig {
  mongoConnectionString: string;
}

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
}

function getEnv(key: string): string {
  const env = process.env[key];
  if (!env) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return env;
}

export default (): Config => ({
  app: { port: parseInt(getEnv('PORT')) },
  database: {
    mongoConnectionString: getEnv('MONGODB_CONNECTION_STRING'),
  },
});
