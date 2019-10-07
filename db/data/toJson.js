const Papa = require('papaparse');
const fs = require('fs');

// bring in csv file as readable stream
const records = fs.createReadStream(`${__dirname}/usda_crops_5yr.csv`);


// object to hold county values
const countyYields = [];
// object to hold state aggregated values
let stateYields = {};

// parse CSV to create state object and save county/state data
Papa.parse(records, {
  download: true,
  step: (row) => {
    const [crop, fips_code, county_name, state_code, year, total_harvested_acres, total_yield] = row.data;
    // store county yield values
    countyYields.push({ crop, county_fips: fips_code, county_name, state_code, year, total_harvested_acres, total_yield });
    // aggregate harvested acres and yield values by state
    const stateRowId = `${state_code}-${crop}-${year}`;
    if (!stateYields[stateRowId]) {
      stateYields[stateRowId] = {
        state_code,
        crop,
        year,
        total_harvested_acres: Number(total_harvested_acres),
        total_yield: Number(total_yield),
      };
    } else {
      stateYields[stateRowId] = {
        ...stateYields[stateRowId],
        total_harvested_acres: stateYields[stateRowId].total_harvested_acres + Number(total_harvested_acres),
        total_yield: stateYields[stateRowId].total_yield + Number(total_yield),
      };
    }
  },
  complete: async () => {
    stateYields = Object.values(stateYields);
    console.log('Done: ', countyYields.length, stateYields.length);
  },
});
