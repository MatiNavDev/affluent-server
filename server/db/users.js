const DBInstance = require('.')

class User {
  getUsers () {
    return DBInstance.query('SELECT * from users;')
  }

  // TODO: make clear that this is not preventing from sql injection but for a quickly demo I made this that is not a production
  // code
  async refreshUsers (users) {
    await DBInstance.query('DELETE from users;')
    
    const valuesToInsert = users
      .map(({email, first_name, last_name, avatar}) => `,('${first_name}', '${last_name}', '${avatar}', '${email}') `)
      .join('')
      .substring(1)
    
    return DBInstance.query(`INSERT INTO users
      (first_name, last_name, avatar, email)
      VALUES
      ${valuesToInsert};`)
  }
}

module.exports = new User()