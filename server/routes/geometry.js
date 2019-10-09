const express = require('express');
const { db } = require('../config/dbConnection');

const router = express.Router();

// request state geometry
router.get('/state', async (req, res) => {
  try {
    // construct state geometry records as feature collection
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
                  SELECT region, state_code, state_name, land_area
                ) t
              ) AS "properties"
            FROM state_geometry
          ) AS f
        ) AS fc
      `))
      .select('*')
      .from('results')
      .catch((error) => console.log('There was a database error getting state geometry: ', error));

    if (results && results[0] && results[0].row_to_json) {
      res.status(200).json({ stateGeometry: results[0].row_to_json });
    } else {
      res.status(500).json({ error: 'Faulty database query' });
    }
  } catch (error) {
    console.error('There was a server error getting state geometry: ', error);
    res.status(500).json({ error });
  }
});

// request county geometry
router.get('/county', async (req, res) => {
  try {
    // construct state geometry records as feature collection
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
                  SELECT county_fips, land_area
                ) t
              ) AS "properties"
            FROM county_geometry
          ) AS f
        ) AS fc
      `))
      .select('*')
      .from('results')
      .catch((error) => console.log('There was a database error getting county geometry: ', error));

    if (results && results[0] && results[0].row_to_json) {
      res.status(200).json({ countyGeometry: results[0].row_to_json });
    } else {
      res.status(500).json({ error: 'Faulty database query' });
    }
  } catch (error) {
    console.error('There was a server error getting county geometry: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;
