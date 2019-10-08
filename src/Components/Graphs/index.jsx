import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Year from './Year';
import Crop from './Crop';
import HarvestedAcres from './HarvestedAcres';
import TotalYield from './TotalYield';

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
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

const Graphs = () => {
  const classes = styles();
  return (
    <Paper id="crop-graphs" className={classes.paper}>
      <Crop />
      <Year />
      <Divider className={classes.divider} variant="fullWidth" />
      <HarvestedAcres />
      <TotalYield />
    </Paper>
  );
};

export default Graphs;
