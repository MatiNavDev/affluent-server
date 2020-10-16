const puppeteer = require('puppeteer')
const { affluent } = require('../../../config')
const DBInstance = require('../../db/dates')

const firefoxOptions = {
  product: 'firefox',
  // Make browser logs visible
  dumpio: true,
  headless: true 
};

const run = async () => {
  try {
    const browser = await puppeteer.launch(firefoxOptions);
    const page = await browser.newPage();
    await page.goto('https://develop.pub.afflu.net/login');

    await Promise.all([
      page.$eval('input[name=username]', (el, user) => el.value = user, affluent.user),
      page.$eval('input[name=password]', (el, password) => el.value = password, affluent.password)
    ])

    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.goto('https://develop.pub.afflu.net/list?type=dates&startDate=2019-04-30&endDate=2020-04-01')
    await page.waitForSelector('select[name=DataTables_Table_0_length]')
    await page.select('select[name=DataTables_Table_0_length]', '-1')
    await page.waitForSelector('.dataTables_paginate paging_bootstrap_full_number', {hidden: true});
    await page.waitForSelector('#DataTables_Table_0');

    let results = []
    while (!results.length) {
      await page.waitFor(1000)
      results = await page.evaluate(() => {
        const rows = document.querySelectorAll('#DataTables_Table_0 > tbody > tr');
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
      })
    }

    await DBInstance.refreshDates(results)
  } catch (error) {
    //handle error
    console.log(error)
  }
}

module.exports = run