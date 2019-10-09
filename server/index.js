// load environmental variables from .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressEnforcesSsl = require('express-enforces-ssl');

// routes
const geometryRoute = require('./routes/geometry');
const yieldRoute = require('./routes/yield');

// create server
const app = express();

// use helmet to protect through headers
app.use(helmet());

// check connection, set port (update .env file with a PORT prop if you want to specify)
app.get('/ping', (req, res) => res.send('OK'));
const PORT = process.env.PORT || 4200;

// if not developing locally, force https
if (process.env.NODE_ENV !== 'development') {
  app.enable('trust proxy');
  app.use(expressEnforcesSsl());
  const ONE_YEAR = 31536000;
  app.use(helmet.hsts({
    maxAge: ONE_YEAR,
    force: true,
  }));
}

// connect app server to api routes
app.use(bodyParser.json({ limit: '2mb' }));

// routes
app.use('/api/geometry', geometryRoute);
app.use('/api/yield', yieldRoute);

// serve React app to client
app.use('/', express.static(`${__dirname}/../build`));
app.use('/*', express.static(`${__dirname}/../build`));

// set the app listening
app.listen(PORT, () => {
  console.log(`County crop yields server listening on port ${PORT} in ${process.env.NODE_ENV}`);
});
