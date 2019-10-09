import getColor from './getColor';

export default (data, layer, keyProperty, property, quantiles) => {
  // style based on the selected property
  layer.setStyle((feature) => {
    // get the value to style by
    const key = feature.getProperty(keyProperty);

    // make sure the feature should show up
    if (!data[key]) {
      return {
        clickable: false,
        visible: false,
      };
    }

    const value = data[key][property];

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
