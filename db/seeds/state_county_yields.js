const countyYields = require('../data/countyYields.json');
const stateYields = require('../data/stateYields.json');

exports.seed = async (knex) => {
  const chunkSize = 500;
  await knex('county_yields').del()
    .then(() => knex.batchInsert('county_yields', countyYields, chunkSize))
    .catch((error) => console.log('County yields insert failed: ', error));
  await knex('state_yields').del()
    .then(() => knex.batchInsert('state_yields', stateYields, chunkSize))
    .catch((error) => console.log('State yields insert failed: ', error));
};
