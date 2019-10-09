import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Year from './Year';
import Crop from './Crop';
import HarvestedAcres from './HarvestedAcres';
import TotalYield from './TotalYield';
import Aggregate from './Aggregate';

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    width: '100%',
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Graphs = ({ vis }) => {
  const classes = styles();
  return (
    <Paper id="crop-graphs" className={classes.paper}>
      <Crop />
      <Year />
      <Divider className={classes.divider} variant="fullWidth" />
      {/* TODO: combine all bar charts into one */}
      {vis === 'total_harvested_acres' && <HarvestedAcres />}
      {vis === 'total_yield' && <TotalYield />}
      <Aggregate />
    </Paper>
  );
};

const mapStateToProps = (state) => ({ vis: state.map.vis });

export default connect(mapStateToProps, null)(Graphs);
