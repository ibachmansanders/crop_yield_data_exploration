import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Barchart from './Barchart';

const HarvestedAcres = ({ harvestData }) => (
  <>
    <Typography align="center" variant="h6">Total Harvested Acres</Typography>
    <Barchart data={harvestData} x="name" y="total_harvested_acres" />
  </>
);

const mapStateToProps = (state) => ({
  harvestData: state.map.harvestData,
});

export default connect(mapStateToProps, null)(HarvestedAcres);
