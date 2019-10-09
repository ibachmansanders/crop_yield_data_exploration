import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
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
    zIndex: 1,
  },
}));

const Vis = ({ vis, scope, updateParam }) => {
  const classes = styles();
  return (
    <Paper className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup value={vis} onChange={(event, vis) => updateParam({ vis })} row>
          <FormControlLabel
            value="total_yield"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">Total Crop Yield (Bushels / Acre)</Typography>}
          />
          <FormControlLabel
            value="total_harvested_acres"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">Total Harvested Acres</Typography>}
          />
          <FormControlLabel
            value="total_production"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">Total Production (Bushels)</Typography>}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <RadioGroup value={scope} onChange={(event, scope) => updateParam({ scope })} row>
          <FormControlLabel
            value="state"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">Show States</Typography>}
          />
          <FormControlLabel
            value="county"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">Show Counties</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  vis: state.map.vis,
  scope: state.map.scope,
});

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Vis);
