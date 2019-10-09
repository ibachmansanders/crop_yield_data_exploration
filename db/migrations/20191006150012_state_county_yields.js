
exports.up = async (knex) => {
  await knex.schema.createTable('state_yields', (table) => {
    table.increments('id').primary();
    table.text('state_code');
    table.text('crop');
    table.integer('year');
    table.integer('total_harvested_acres');
    table.decimal('total_yield');
    table.bigInteger('total_production');
  });

  await knex.schema.createTable('state_geometry', (table) => {
    table.increments('id').primary();
    table.integer('region');
    table.text('state_fips');
    table.text('state_code');
    table.text('state_name');
    table.bigInteger('land_area');
    table.specificType('geometry', 'geometry(MULTIPOLYGON, 4326)');
  });

  await knex.schema.createTable('county_yields', (table) => {
    table.increments('id').primary();
    table.text('state_code');
    table.text('county_fips');
    table.text('county_name');
    table.text('crop');
    table.integer('year');
    table.integer('total_harvested_acres');
    table.decimal('total_yield');
    table.bigInteger('total_production');
  });

  await knex.schema.createTable('county_geometry', (table) => {
    table.increments('id').primary();
    table.text('county_fips');
    table.bigInteger('land_area');
    table.specificType('geometry', 'geometry(MULTIPOLYGON, 4326)');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('state_yields');
  await knex.schema.dropTableIfExists('state_geometry');
  await knex.schema.dropTableIfExists('county_yields');
  await knex.schema.dropTableIfExists('county_geometry');
};
