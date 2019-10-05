const knex = require('knex');

// some shared db config
const dbSetup = {
  // use null for empty strings or missing values
  useNullAsDefault: true,
  // location db migration files to set up database, seed files to seed database
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
  pool: {
    afterCreate: (connection, callback) => {
      connection.query('SET timezone ="EST";', (err) => {
        callback(err, connection);
      });
    }
  },
};

const connection = {
  development: {
    client: 'pg',
    connection: {
      port: process.env.CROP_YIELD_DEV_PORT,
      host: process.env.CROP_YIELD_DEV_HOST,
      user: process.env.CROP_YIELD_DEV_USER,
      password: process.env.CROP_YIELD_DEV_PASS,
      database: process.env.CROP_YIELD_DEV_DB,
    },
    ...dbSetup,
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.CROP_YIELD_PORT,
      host: process.env.CROP_YIELD_HOST,
      user: process.env.CROP_YIELD_USER,
      password: process.env.CROP_YIELD_PASS,
      database: process.env.CROP_YIELD_DB,
    },
    ...dbSetup,
  },
};

module.exports.db = knex(connection[process.env.NODE_ENV]);
