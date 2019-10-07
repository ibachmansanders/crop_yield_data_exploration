import getColor from './getColor';

export default (map, geojson, property, quantiles) => {
  // load data to the map
  map.data.addGeoJson(geojson);

  // style based on the selected property
  map.data.setStyle((feature) => {
    // get the value to style by
    const value = feature.getProperty(property);

    // return the style object
    return {
      fillColor: getColor(value, quantiles),
      fillOpacity: 0.5,
      strokeColor: '#006d2c',
      strokeOpacity: 1,
      strokeWeight: 1,
    };
  });
};
