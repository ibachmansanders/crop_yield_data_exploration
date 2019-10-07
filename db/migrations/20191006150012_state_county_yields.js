
exports.up = async (knex) => {
  await knex.schema.createTable('state_yields', (table) => {
    table.increments('id').primary();
    table.text('state_code');
    table.text('crop');
    table.integer('year');
    table.integer('total_harvested_acres');
    table.decimal('total_yield');
  });

  await knex.schema.createTable('state_geometry', (table) => {
    table.increments('id').primary();
    table.integer('region');
    table.text('state_fips');
    table.text('state_code');
    table.text('state_name');
    table.integer('land_area');
    table.specificType('polygon', 'geometry(MULTIPOLYGON, 4326)');
  });

  await knex.schema.createTable('county_yields', (table) => {
    table.increments('id').primary();
    table.text('state_fips');
    table.text('county_fips');
    table.text('county_name');
    table.text('crop');
    table.integer('year');
    table.integer('total_harvested_acres');
    table.decimal('total_yield');
  });

  await knex.schema.createTable('county_geometry', (table) => {
    table.increments('id').primary();
    table.text('county_fips');
    table.integer('land_area');
    table.specificType('polygon', 'geometry(MULTIPOLYGON, 4326)');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('sate_yields');
  await knex.schema.dropTableIfExists('county_yields');
};
