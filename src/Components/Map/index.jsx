/* global google: true */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { setMap, setInfoWindow, loadGeometry } from '../../reducers/map';

import loadScript from '../../utils/loadScript';
import config from '../../config';

import Scope from './Scope';
import Legend from './Legend';

const styles = (theme) => ({
  root: {
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  map: {
    height: '100vh',
    width: '100%',
  },
});

class Map extends React.Component {
  // request google maps api and load the map
  componentDidMount() {
    window.initMap = this.initMap;
    loadScript(config.mapUrl);
  }

  initMap = () => {
    const { mapOptions } = config;
    const { setMap, setInfoWindow, loadGeometry } = this.props;
    // create the map, and save it to the store
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.toJSON = () => '<Map>';
    setMap(map);
    // create the infowindow, and save that to store
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.toJSON = () => '<InfoWindow>';
    setInfoWindow(infoWindow);
    // load geometry
    loadGeometry();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Scope />
        <Legend />
        <div className={classes.map} id="map" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMap: (map) => dispatch(setMap(map)),
  setInfoWindow: (infoWindow) => dispatch(setInfoWindow(infoWindow)),
  loadGeometry: () => dispatch(loadGeometry()),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Map));
