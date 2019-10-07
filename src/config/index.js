export default {
  mapUrl: `https://maps.googleapis.com/maps/api/js?libraries=geometry&key=${process.env.REACT_APP_MAP_KEY}&callback=initMap`,
  mapOptions: {
    center: { lat: 38, lng: -98.58 },
    zoom: 5,
    controlSize: 24,
  },
};
