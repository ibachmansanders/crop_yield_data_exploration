export default (map, geojson, property, { bin2, bin3, bin4, bin5 }) => {
  // load data to the map
  map.data.addGeoJson(geojson);

  // style based on the selected property
  map.data.setStyle((feature) => {
    // get the value to style by
    const value = feature.getProperty(property);
    // select color
    let color = '#002C00';
    if (Number(value) < Number(bin5)) color = '#184C1B';
    else if (Number(value) < Number(bin4)) color = '#3C6E3B';
    else if (Number(value) < Number(bin3)) color = '#5F925C';
    else if (Number(value) < Number(bin2)) color = '#83B87F';

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
