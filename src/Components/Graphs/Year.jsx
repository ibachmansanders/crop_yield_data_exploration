import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { updateParam } from '../../reducers/map';

const Year = ({ year, updateParam }) => (
  <div style={{ paddingLeft: '5vw', paddingRight: '5vw', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Typography align="center" variant="button" gutterBottom style={{ width: '100%' }}>Select Year</Typography>
    <Slider
      color="secondary"
      defaultValue={2018}
      step={1}
      min={2014}
      max={2018}
      marks
      valueLabelDisplay="on"
      onChangeCommitted={(event, year) => updateParam({ year })}
    />
  </div>
);

const mapStateToProps = (state) => ({ year: state.map.year });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Year);
