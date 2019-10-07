import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import HarvestedAcres from './HarvestedAcres';

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100vh',
  },
}));

const Graphs = () => {
  const classes = styles();
  return (
    <Paper id="crop-graphs" className={classes.paper}>
      <HarvestedAcres />
    </Paper>
  );
};

export default Graphs;
