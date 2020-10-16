const { CronJob } = require('cron')
const { fetchUsersFromRegres, webScrapeAffluentPage } = require('../helpers/scripts')

class Cron {
  init () {
    this.addCronForDailyScripts()
    console.log('Cron init successfully')
  }

  addCronForDailyScripts () {
    const schedule = `0 0 3 * * *`
    const job = new CronJob (schedule, function () {
      fetchUsersFromRegres();
      webScrapeAffluentPage();
    }, null, true, 'America/Buenos_Aires');

    job.start()
  }
}

module.exports = new Cron()