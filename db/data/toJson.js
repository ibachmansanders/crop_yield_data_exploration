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
  header: true,
  step: (row) => {
    const newRow = {};
    // clean up the data entry a bit
    Object.entries(row.data).forEach(([key, value]) => {
      if (value !== '') {
        if (key === 'FIPS_CODE') key = 'county_fips';
        newRow[key.toLowerCase()] = value;
      }
    });
    // store county yield values
    countyYields.push(newRow);
    // aggregate harvested acres and yield values by state
    const { CROP: crop, STATE_CODE: state_code, YEAR: year, TOTAL_HARVESTED_ACRES: total_harvested_acres, TOTAL_YIELD: total_yield } = row.data;
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
    // write data to file
    fs.writeFileSync(`${__dirname}/stateYields.json`, JSON.stringify(stateYields));
    fs.writeFileSync(`${__dirname}/countyYields.json`, JSON.stringify(countyYields));
  },
});
