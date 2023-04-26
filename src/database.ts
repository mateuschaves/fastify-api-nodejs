import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const client = 'sqlite'

export const config: Knex.Config = {
  client,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
