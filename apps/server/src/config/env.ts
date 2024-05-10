import Env from '@mx7/tenv'

const parser = new Env(process.env as Record<string, string>)

type PosibbleEnvs =
  | 'dev'
  | 'development'
  | 'prod'
  | 'production'
  | 'test'
  | 'testing'
  | 'ci'
  | 'staging'

/*
|============================================
| @ENV parser for env variables with types
| * Type-safe environment variables
| * One time parsing and access
| * Add more as you need
|============================================
*/
const env = {
  envMode: parser.key<PosibbleEnvs>('NODE_ENV', 'dev').get(),
  isProduction: parser.isProduction,
  isDevelopment: parser.isDevelopment,
  isStaging: parser.isStaging,
  isTest: parser.isTest,
  // isCI: parser.key<boolean>('CI', false).bool().get(),

  // Application specific configurations //
  port: parser.key<number>('PORT', 5000).integer().unsigned().get(),
  host: parser.key<string>('HOST', '0.0.0.0').url().get(),
  logLevel: parser.key('LOG_LEVEL', 'info').get(),
  databases: {
    postgres: parser
      .key('POSTGRES_URI', 'postgres://postgres:postgres@127.0.0.1:5432/pern')
      .get(),
    redis: parser.key('REDIS_URI', 'redis://127.0.0.1:6379/pern').get(),
  },
  // add more as you need ...
} as const

export default env
