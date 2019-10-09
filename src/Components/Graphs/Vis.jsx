import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { updateParam } from '../../reducers/map';

const Vis = ({ vis, updateParam }) => {
  let title = 'Crop Yield (Bushels / Acre)';
  if (vis === 'total_harvested_acres') title = 'Harvested Acres';
  if (vis === 'total_production') title = 'Crop Production';
  return (
    <FormControl component="fieldset" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
      <Typography align="center" variant="h5" gutterBottom style={{ width: '100%' }}>US {title} 2014 - 2018</Typography>
      <RadioGroup value={vis} onChange={(event, vis) => updateParam({ vis })} row style={{ justifyContent: 'center' }}>
        <FormControlLabel
          value="total_yield"
          control={<Radio color="secondary" />}
          label={<Typography>Crop Yield (BPA)</Typography>}
        />
        <FormControlLabel
          value="total_harvested_acres"
          control={<Radio color="secondary" />}
          label={<Typography>Harvested Acres</Typography>}
        />
        <FormControlLabel
          value="total_production"
          control={<Radio color="secondary" />}
          label={<Typography>Production (Bushels)</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

const mapStateToProps = (state) => ({ vis: state.map.vis });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Vis);
