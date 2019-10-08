import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { updateParam } from '../../reducers/map';

const styles = makeStyles((theme) => ({
  root: {
    left: 6,
    top: 40,
    paddingLeft: theme.spacing(),
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: '2px',
    boxShadow: '1px 1px 2px rgba(10, 10, 10, 0.25)',
    zIndex: 1,
  },
}));

const Vis = ({ vis, updateParam }) => {
  const classes = styles();
  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroup value={vis} onChange={(event, vis) => updateParam({ vis })} row>
        <FormControlLabel
          value="total_yield"
          control={<Radio color="secondary" />}
          label={<Typography variant="caption">Total Crop Yield</Typography>}
        />
        <FormControlLabel
          value="total_harvested_acres"
          control={<Radio color="secondary" />}
          label={<Typography variant="caption">Total Harvested Acres</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

const mapStateToProps = (state) => ({ vis: state.map.vis });

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Vis);
