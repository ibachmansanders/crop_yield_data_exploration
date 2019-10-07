# crop_yield_data_exploration
A tool to explore  national crop yield data to the county level over the last five years.

## Database

### creating the database
I use the Knex.js library to create my PostgreSQL database, seed it with data, and then query it from the app backend.  Check out the library here: [http://knexjs.org/](http://knexjs.org/).  `db/migrations` holds the files that generate the schema.  `db/seeds` holds the files that insert data into the tables.  `knexfile.js` holds the connection configuration for my dev and 'production' databases.

### loading data
I decided to include state-level yield data, as I felt seeing counties at a national scale could affect performance, and seeing state aggregations could be a useful view.  All data is generated from db/data/usda_crops.5yr.csv.  In order to gerenate the json files required to seed the database, run: `node db/data/toJson.js`.  This file reads in the CSV, parses it to JSON, and prepares the county yield data for insertion into the database.  It also aggregates the yield values by state in a JSON object, as well.  Both county and state yields are then written to JSON files.

Once you have the JSON files generated, seed the datase with either `npm run seed-dev` or `npm run seed`, depending on the environment.  Knex.js will batch insert the data in chunks of 500 rows to your database.

### loading geometry
Geometry is available from the US census.  You will need geometry for US counties and states, with fields matching those in the migration 20191006150012_state_county_yields.js.  The easiest way to insert geometry into PostgreSQL is with OGR2OGR, an open source tool that is part of the GDAL library, available at [https://gdal.org/programs/ogr2ogr.html](https://gdal.org/programs/ogr2ogr.html)

Sample command: `ogr2ogr -f "PostgreSQL" PG:"dbname=crop_yields user=postgres" "...path-to\state_yields.geojson" -nln state_geometry -append`

Connection parameters will have to be adjusted depending on which environment you're writing to - this is for a local database.