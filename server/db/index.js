const mysql = require('mysql')
const { promisify } = require('util')
const config = require('../../config')

class DBInstance {
  constructor () {
    this.db = mysql.createConnection(config.mysql)
    this.db.query = promisify(this.db.query.bind(this.db))
  }

  async init () {
    await this.db.query('SELECT 1')
    console.log('DB init succesfully')
  }

  query (query) {
    return this.db.query(query)
  }
}


module.exports = new DBInstance()