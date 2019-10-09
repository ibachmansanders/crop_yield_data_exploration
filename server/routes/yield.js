const express = require('express');
const { db } = require('../config/dbConnection');

const router = express.Router();

// request yield and geometry data
router.get('/', async (req, res) => {
  try {
    const { crop, year, vis, scope } = req.query;

    // load yield data depending on scope
    let data = {};

    if (scope === 'state') {
      data = await db('state_yields')
        .select('state_code', 'total_harvested_acres', 'total_yield', 'total_production')
        .where({ crop, year })
        .orderBy('state_code')
        // convert data to object for lookup in app
        .then((results) => results.reduce((acc, row) => {
          acc[row.state_code] = row;
          return acc;
        }, {}))
        .catch((error) => {
          console.log('There was an error loading state data: ', error);
          res.status(500).json({ error });
        });
    } else if (scope === 'county') {
      data = await db('county_yields')
        .select('county_fips', 'county_name', 'state_code', 'total_harvested_acres', 'total_yield', 'total_production')
        .where({ crop, year })
        .orderBy('county_name')
        // convert data to object for lookup in app
        .then((results) => results.reduce((acc, row) => {
          acc[row.county_fips] = row;
          return acc;
        }, {}))
        .catch((error) => {
          console.log('There was an error loading county data: ', error);
          res.status(500).json({ error });
        });
    }

    // adjust query depending on whether you're loading states or counties
    let _vis;
    if (vis === 'total_harvested_acres') _vis = 'total_harvested_acres';
    if (vis === 'total_yield') _vis = 'total_yield';
    if (vis === 'total_production') _vis = 'total_production';
    let table;
    if (scope === 'state') table = scope;
    if (scope === 'county') table = scope;
    // get quantiles for choropleth and bar graphs
    const [quantiles] = await db(`${table}_yields`)
      .select([
        db.raw(`percentile_disc(0) WITHIN GROUP (ORDER BY ${table}_yields.${_vis}) AS bin1`),
        db.raw(`percentile_disc(0.2) WITHIN GROUP (ORDER BY ${table}_yields.${_vis}) AS bin2`),
        db.raw(`percentile_disc(0.4) WITHIN GROUP (ORDER BY ${table}_yields.${_vis}) AS bin3`),
        db.raw(`percentile_disc(0.6) WITHIN GROUP (ORDER BY ${table}_yields.${_vis}) AS bin4`),
        db.raw(`percentile_disc(0.8) WITHIN GROUP (ORDER BY ${table}_yields.${_vis}) AS bin5`),
      ])
      .where({ crop, year })
      .catch((error) => console.log('There was an error getting quantiles: ', error));

    res.status(200).json({ data, quantiles });
  } catch (error) {
    console.error('There was a server error getting yields: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;
