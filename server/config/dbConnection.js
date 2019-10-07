const knex = require('knex');
const config = require('../../knexfile');

const env = process.env.NODE_ENV;
const dbConfig = config[env];
console.log(`Connecting to ${dbConfig.connection.database} database with user ${dbConfig.connection.user} in ${env} environment...`);

module.exports.db = knex(dbConfig);
