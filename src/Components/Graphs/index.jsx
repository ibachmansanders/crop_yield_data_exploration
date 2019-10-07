import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import HarvestedAcres from './HarvestedAcres';
import TotalYield from './TotalYield';

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    maxHeight: '100vh',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Graphs = () => {
  const classes = styles();
  return (
    <Paper id="crop-graphs" className={classes.paper}>
      <HarvestedAcres />
      <TotalYield />
    </Paper>
  );
};

export default Graphs;
