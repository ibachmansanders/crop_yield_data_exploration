import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { updateParam } from '../../reducers/map';

const Crop = ({ crop, updateParam }) => (
  <FormControl component="fieldset" style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
    <Typography align="center" variant="button" gutterBottom style={{ width: '100%' }}>Select Crop</Typography>
    <RadioGroup value={crop} onChange={(event, crop) => updateParam({ crop })} row style={{ justifyContent: 'center' }}>
      <FormControlLabel
        value="CORN"
        control={<Radio color="secondary" />}
        label="Corn"
      />
      <FormControlLabel
        value="COTTON"
        control={<Radio color="secondary" />}
        label="Cotton"
      />
      <FormControlLabel
        value="RICE"
        control={<Radio color="secondary" />}
        label="Rice"
      />
      <FormControlLabel
        value="SOYBEANS"
        control={<Radio color="secondary" />}
        label="Soybeans"
      />
      <FormControlLabel
        value="WHEAT"
        control={<Radio color="secondary" />}
        label="Wheat"
      />
    </RadioGroup>
  </FormControl>
);

const mapStateToProps = (state) => ({ crop: state.map.crop });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Crop);
