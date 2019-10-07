export default (map, geojson, property, { bin2, bin3, bin4, bin5 }) => {
  // load data to the map
  map.data.addGeoJson(geojson);

  // style based on the selected property
  map.data.setStyle((feature) => {
    // get the value to style by
    const value = feature.getProperty(property);
    // select color
    let color = '#006d2c';
    if (Number(value) < Number(bin5)) color = '#31a354';
    else if (Number(value) < Number(bin4)) color = '#74c476';
    else if (Number(value) < Number(bin3)) color = '#bae4b3';
    else if (Number(value) < Number(bin2)) color = '#edf8e9';

    // return the style object
    return {
      fillColor: color,
      fillOpacity: 0.5,
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 1,
    };
  });
};
