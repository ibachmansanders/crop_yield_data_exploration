// load environmental variables from .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const expressEnforcesSsl = require('express-enforces-ssl');

// routes
const geometryRoute = require('./routes/geometry');
const yieldRoute = require('./routes/yield');

// create server
const app = express();

// set up cors restrictions - whitelist specific site origins for the front end
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'TODO:appengineURL',
  optionsSuccessStatus: 200,
};

// use helmet to protect through headers
app.use(helmet());

// check connection, set port (update .env file with a PORT prop if you want to specify)
app.get('/ping', cors(corsOptions), (req, res) => res.send('OK'));
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
app.use('/api/geometry', cors(corsOptions), geometryRoute);
app.use('/api/yield', cors(corsOptions), yieldRoute);

// set the app listening
app.listen(PORT, () => {
  console.log(`County crop yields server listening on port ${PORT} in ${process.env.NODE_ENV}`);
});
