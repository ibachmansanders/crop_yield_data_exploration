import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { updateParam } from '../../reducers/map';

const Year = ({ year, updateParam }) => (
  <>
    <Typography gutterBottom>Select Year</Typography>
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
  </>
);

const mapStateToProps = (state) => ({ year: state.map.year });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Year);
