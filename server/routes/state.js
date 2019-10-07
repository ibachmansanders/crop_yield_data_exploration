const express = require('express');
const { db } = require('../config/dbConnection');

const router = express.Router();

// get all states
router.get('/', async (req, res) => {
  try {
    const { crop, year } = req.query;
    console.log('fetch states: ', req.query);
    // get the states data and geometry
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
                    state_geometry.region, state_geometry.state_code, state_geometry.state_name, state_geometry.land_area,
                    state_yields.total_harvested_acres, state_yields.total_yield
                ) t
              ) AS "properties"
            FROM state_geometry
            INNER JOIN state_yields ON state_yields.state_code = state_geometry.state_code
            WHERE state_yields.crop = :crop AND state_yields.year= :year
          ) AS f
        ) AS fc
      `, { crop, year }))
      .select('*')
      .from('results')
      .catch((error) => console.log('There was a database error getting state yields: ', error));

    // get state quantiles
    const [quantiles] = await db('state_yields')
      .select([
        db.raw('percentile_disc(0) WITHIN GROUP (ORDER BY state_yields.total_yield) AS bin1'),
        db.raw('percentile_disc(0.2) WITHIN GROUP (ORDER BY state_yields.total_yield) AS bin2'),
        db.raw('percentile_disc(0.4) WITHIN GROUP (ORDER BY state_yields.total_yield) AS bin3'),
        db.raw('percentile_disc(0.6) WITHIN GROUP (ORDER BY state_yields.total_yield) AS bin4'),
        db.raw('percentile_disc(0.8) WITHIN GROUP (ORDER BY state_yields.total_yield) AS bin5'),
      ])
      .where({ crop, year })
      .catch((error) => console.log('There was an error getting quantiles: ', error));

    if (results && results[0] && results[0].row_to_json) {
      res.status(200).json({ data: results[0].row_to_json, quantiles });
    } else {
      res.status(500).json({ error: 'Faulty database query' });
    }
  } catch (error) {
    console.error('There was a server error getting state yields: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;
