const express = require('express');
const { db } = require('../config/dbConnection');

const router = express.Router();

// get all states
router.get('/', async (req, res) => {
  try {
    const { state_code, crop, year } = req.query;
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
                  SELECT crop, state_code, year, total_harvested_acres, total_yield
                ) t
              ) AS "properties"
            FROM crop_yields
            WHERE year=${year} AND state_code = ${state_code} AND crop = ${crop}
          ) AS f
        ) AS fc
      `))
      .select('*')
      .from('results')
      .catch((error) => console.log('There was a database error getting state yields: ', error));

    if (results && results[0] && results[0].row_to_json) {
      res.status(200).json(results[0].row_to_json);
    } else {
      res.status(500).json({ error: 'Faulty database query' });
    }
  } catch (error) {
    console.error('There was a server error getting state yields: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;