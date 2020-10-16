const axios = require('axios')
const DBInstance = require('../../db/users')

const regresApi = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * The scenario which i handle is that users data change all days ( for making some "real scenario" 
 * where that data has to be consumed regularly ) so when i get this data i have to delete all previous
 * data and insert this "fresh" data
 */
const run = async () => {
  try {
    const { data: 
      {
        total_pages, 
        data: allData 
      } 
    } = await regresApi.get('/users')
    
    if (total_pages > 1 ) {
      const dataFromPages = await Promise.all(
        new Array(total_pages).fill().map((_, i) => regresApi.get(`/users?page=${i + 2}`))
      )

      dataFromPages.forEach(dataFromPage => allData.push(...dataFromPage.data.data))
    }

    await DBInstance.refreshUsers(allData)
    
    console.log('fetchUsersFromRegres script ran OK')
  } catch (error) {
    // handle error
    console.log('Error running fetchUsersFromRegres Script: ' + error)
  }
}

module.exports = run