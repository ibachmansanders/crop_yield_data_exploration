const express = require('express');
const { db } = require('../config/dbConnection');

const router = express.Router();

// request yield and geometry data
router.get('/', async (req, res) => {
  try {
    const { crop, year, vis, scope } = req.query;
    console.log('fetch yields: ', req.query);

    // adjust query depending on whether you're loading states or counties
    // loading states
    let innerSelect = `
      state_geometry.region, state_geometry.state_code, state_geometry.state_name, state_geometry.land_area,
      state_yields.total_harvested_acres, state_yields.total_yield
    `;
    let table = 'state';
    let join = 'state_yields ON state_yields.state_code = state_geometry.state_code';
    let order = 'state_yields.state_code';
    let _vis;
    if (vis === 'total_harvested_acres') _vis = 'total_harvested_acres';
    if (vis === 'total_yield') _vis = 'total_yield';

    // loading counties
    if (scope === 'county') {
      innerSelect = `
        county_geometry.region, county_geometry.state_code, county_geometry.county_name, county_geometry.land_area,
        county_yields.total_harvested_acres, county_yields.total_yield
      `;
      table = 'county';
      join = 'county_yields ON county_yields.county_fips = county_geometry.county_fips';
      order = 'county_yields.county_name';
    }

    // get the data and geometry
    const results = await db
      .with('results', db.raw(`
        SELECT row_to_json(fc)
        FROM (
          SELECT
            'FeatureCollection' AS "type",
            array_to_json(array_agg(f)) AS "features"
          FROM (
            SELECT
              'Feature' AS "type",
              ST_AsGeoJSON(ST_Transform(geometry, 4326)) :: json AS "geometry",
              (
                SELECT json_strip_nulls(row_to_json(t))
                FROM (
                  SELECT
                    ${innerSelect}
                ) t
              ) AS "properties"
            FROM ${table}_geometry
            INNER JOIN ${join}
            WHERE ${table}_yields.crop = :crop AND ${table}_yields.year= :year
            ORDER BY ${order}
          ) AS f
        ) AS fc
      `, { crop, year }))
      .select('*')
      .from('results')
      .catch((error) => console.log('There was a database error getting state yields: ', error));

    // get state quantiles
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

    // get aggregate of current scope
    const aggregate = await db
      .with('totals', (queryBuilder) => queryBuilder
        .select('crop', 'year')
        .from(`${table}_yields`)
        .sum({ total_yield: 'total_yield' })
        .sum({ total_harvested_acres: 'total_harvested_acres' })
        .groupBy(['crop', 'year'])
        .orderBy(['crop', 'year'])
        .catch((error) => console.log('There was an error aggregating data: ', error)))
      .select('crop', db.raw('jsonb_agg(totals) as years')).from('totals').groupBy('crop')
      .catch((error) => console.log('There was an error aggregating: ', error));

    if (results && results[0] && results[0].row_to_json) {
      res.status(200).json({ data: results[0].row_to_json, quantiles, aggregate });
    } else {
      res.status(500).json({ error: 'Faulty database query' });
    }
  } catch (error) {
    console.error('There was a server error getting yields: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;
