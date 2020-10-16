const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user');
const dateRoutes = require('./routes/date');
const DBInstance = require('./db')
const Cron = require('./cron')
const { runInitialScripts } = require('./helpers/scripts')

const routeInitialText = '/affluent-api/v1';

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://someProject.herokuapp.com');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

  
// Initialize app routes
app.use(`${routeInitialText}/users`, userRoutes);
app.use(`${routeInitialText}/dates`, dateRoutes);

const PORT = process.env.PORT || 3007;

const init = async () => {
  try {
    await DBInstance.init()
    await runInitialScripts()
    Cron.init()
    app.listen(PORT, () => console.log(`Affluent project running in port: ${PORT}`));
  } catch (error) {
    // handle error 
    console.log(error)
  }

}

/**
 * TODO:
 * - hacer bien el schedule
 * - fijarse que funcione bien el tema de cron
 * - fijarse de sacar todos los comentarios
 * 
 * Readme: 
 * - aclarar lo del error, que se hace simple ahora solo agregando un pequeño modulo que 
 *   no deje que cualquier error sea enviado al usuario
 * - aclarar que hacemos como que la data se renueva todos los dias, por eso metimos el cron
 * - en los pasos para correr, incluir de correr PUPPETEER_PRODUCT=firefox npm i puppeteer ( es literal este comando)
 */

init()
