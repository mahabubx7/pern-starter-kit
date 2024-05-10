import { Sequelize } from 'sequelize'
import env from '@config/env'
import logger from './logger'
/*
|============================================
| @Sequelize (ORM) client
| * Database connection client <postgres>
|============================================
*/
const sequelize = new Sequelize(env.databases.postgres, {
  logging: env.isDevelopment,
  dialect: 'postgres',
  dialectOptions: {
    ssl: env.isProduction,
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
  },
})

export const authenticatePostgresDb = async () => {
  try {
    await sequelize.authenticate()
    logger.info('⛁ Postgres connected successfully!')
  } catch (error) {
    logger.error('❌ Unable to connect to the database:', error)
  }
}

export default sequelize
