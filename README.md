# crop_yield_data_exploration
A tool to explore  national crop yield data to the county level over the last five years.

## Database

### creating the database
I use the Knex.js library to create my PostgreSQL database, seed it with data, and then query it from the app backend.  Check out the library here: [http://knexjs.org/](http://knexjs.org/).  `db/migrations` holds the files that generate the schema.  `db/seeds` holds the files that insert data into the tables.  `knexfile.js` holds the connection configuration for my dev and 'production' databases.

### loading data
I decided to include state-level yield data, as I felt seeing counties at a national scale could affect performance, and seeing state aggregations could be a useful view.  All data is generated from db/data/usda_crops.5yr.csv.  In order to gerenate the json files required to seed the database, run: `node db/data/toJson.js`.  This file reads in the CSV, parses it to JSON, and prepares the county yield data for insertion into the database.  It also aggregates the yield values by state in a JSON object, as well.  Both county and state yields are then written to JSON files.

Once you have the JSON files generated, rollback the database to remove tables with `npm run migrate-rollback-dev`, initialize the schema with `npm run migrate-dev` and then seed the datase with `npm run seed-dev`.  There are matching scripts without the `-dev` suffix for pushing to production.  Knex.js will batch insert the data in chunks of 500 rows to your database.

### loading geometry
County geometry came from the [US Census](https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2019&layergroup=Counties+%28and+equivalent%29), while state geometry was generated by [Natural Earth](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/).  For better performance, I simplified the county geometry using [https://mapshaper.org](https://mapshaper.org)  I used OGR2OGR to insert the geometry, an open source tool that is part of the GDAL library, available at [https://gdal.org/programs/ogr2ogr.html](https://gdal.org/programs/ogr2ogr.html)

Insert states to local DB: `ogr2ogr -f "PostgreSQL" PG:"dbname=crop_yields user=postgres" "db\data\state_geometry.geojson" -nln state_geometry -append`

Instert counties to local DB: `ogr2ogr -f "PostgreSQL" PG:"dbname=crop_yields user=postgres" "db\data\county_geometry.geojson" -nlt PROMOTE_TO_MULTI -nln county_geometry -append`

Connection parameters will have to be adjusted depending on which environment you're writing to - this is for a local database.

## Planned Features

Routing and URL query parameters via `react-router-dom`
Include loading spinners
Visualize errors with snackbar
Use land_area attribute to visualize density of crop area by county/state