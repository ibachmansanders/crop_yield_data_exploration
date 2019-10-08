import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { updateParam } from '../../reducers/map';

const Crop = ({ crop, updateParam }) => (
  <FormControl component="fieldset" style={{ width: '100%' }}>
    <Typography>Select Crop</Typography>
    <RadioGroup value={crop} onChange={(event, crop) => updateParam({ crop })} row>
      <FormControlLabel
        value="CORN"
        control={<Radio color="primary" />}
        label="Corn"
      />
      <FormControlLabel
        value="COTTON"
        control={<Radio color="primary" />}
        label="Cotton"
      />
      <FormControlLabel
        value="RICE"
        control={<Radio color="primary" />}
        label="Rice"
      />
      <FormControlLabel
        value="SOYBEANS"
        control={<Radio color="primary" />}
        label="Soybeans"
      />
      <FormControlLabel
        value="WHEAT"
        control={<Radio color="primary" />}
        label="Wheat"
      />
    </RadioGroup>
  </FormControl>
);

const mapStateToProps = (state) => ({ crop: state.map.crop });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Crop);
