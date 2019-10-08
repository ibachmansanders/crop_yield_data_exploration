import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Barchart from './Barchart';

const TotalYield = ({ yieldData }) => (
  <>
    <Typography align="center" variant="h6">Total Yield, Bushels / Acre</Typography>
    {yieldData.length ? (
      <Barchart data={yieldData} x="name" y="total_yield" />
    ) : (
      <Typography align="center">No yield data available.</Typography>
    )}
  </>
);

const mapStateToProps = (state) => ({
  yieldData: state.map.yieldData,
});

export default connect(mapStateToProps, null)(TotalYield);
