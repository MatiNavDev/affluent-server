const fetchUsersFromRegres = require('./fetchUsersFromRegres')
const webScrapeAffluentPage = require('./webScrapeAffluentPage')

const runInitialScripts = () => 
  Promise.all([
    fetchUsersFromRegres(),
    webScrapeAffluentPage()
  ])

module.exports = {
  fetchUsersFromRegres,
  webScrapeAffluentPage,
  runInitialScripts
}