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
    let newRow = {};
    // clean up the data entry a bit
    Object.entries(row.data).forEach(([key, value]) => {
      if (value !== '') {
        if (key === 'FIPS_CODE') key = 'county_fips';
        newRow[key.toLowerCase()] = value;
      }
    });
    // calculate total_production- bushels/acre * acres harvested
    newRow = { ...newRow, total_production: Math.round(Number(newRow.total_harvested_acres) * Number(newRow.total_yield)) };
    // store county yield values
    countyYields.push(newRow);
    // aggregate harvested acres and yield values by state
    const { state_code, crop, year, total_harvested_acres, total_yield, total_production } = newRow;
    const stateRowId = `${state_code}-${crop}-${year}`;
    // initialize stateYields entry
    if (!stateYields[stateRowId]) {
      stateYields[stateRowId] = {
        state_code,
        crop,
        year,
        total_harvested_acres: Number(total_harvested_acres),
        total_yield: Number(total_yield),
        total_production: Number(total_production),
        count: 1,
      };
    // or add to it
    } else {
      stateYields[stateRowId] = {
        ...stateYields[stateRowId],
        total_harvested_acres: stateYields[stateRowId].total_harvested_acres + Number(total_harvested_acres),
        total_yield: stateYields[stateRowId].total_yield + Number(total_yield),
        total_production: stateYields[stateRowId].total_production + Number(total_production),
        // only increment count if a state_yield value is present
        count: stateYields[stateRowId].total_yield ? stateYields[stateRowId].count + 1 : stateYields[stateRowId].count,
      };
    }
  },
  complete: async () => {
    stateYields = Object.values(stateYields).map((state) => {
      // check whether there is missing data, and  null it if necessary
      if (state.total_harvested_acres === 0) delete state.total_harvested_acres;
      if (state.total_yield === 0) delete state.total_yield;
      if (state.total_production === 0) delete state.total_production;
      // calculate average of state total yield
      if (state.count > 0) state.total_yield /= state.count;
      delete state.count;
      return state;
    });
    // write data to file
    fs.writeFileSync(`${__dirname}/stateYields.json`, JSON.stringify(stateYields));
    fs.writeFileSync(`${__dirname}/countyYields.json`, JSON.stringify(countyYields));
  },
});
