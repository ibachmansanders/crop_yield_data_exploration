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

const Vis = ({ scope, updateParam, countyLayer }) => {
  const classes = styles();
  return (
    <Paper className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup value={scope} onChange={(event, scope) => updateParam({ scope })} row>
          <FormControlLabel
            value="state"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">SHOW STATES</Typography>}
          />
          <FormControlLabel
            value="county"
            control={<Radio color="secondary" />}
            label={<Typography variant="caption">SHOW COUNTIES</Typography>}
            disabled={!countyLayer}
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  scope: state.map.scope,
  countyLayer: state.map.countyLayer,
});

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Vis);
