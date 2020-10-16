require('dotenv').config()

module.exports = {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  affluent: {
    user: process.env.AFFLUENT_USER,
    password: process.env.AFFLUENT_PASSWORD
  }
}