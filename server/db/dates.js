const DBInstance = require('.')
class Date {

  getDates () {
    return DBInstance.query('SELECT * from dates;')
  }

  async refreshDates (dates) {
    await DBInstance.query('DELETE from dates;')

    const valuesToInsert = dates
      .map(([date, comission, sales, leads, clicks, epc, impressions, cr]) => 
        `,('${date}', '${comission}', '${sales}', '${leads}', '${clicks}', '${epc}', '${impressions}', '${cr}') `)
      .join('')
      .substring(1)

    return DBInstance.query(`INSERT INTO dates
      (date, comission, sales, leads, clicks, epc, impressions, cr)
      VALUES
      ${valuesToInsert};`)
  }
}

module.exports = new Date()