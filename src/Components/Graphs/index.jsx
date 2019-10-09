import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Vis from './Vis';
import Year from './Year';
import Crop from './Crop';
import Barchart from './Barchart';
import LineChart from './LineChart';

const styles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  paper: {
    padding: theme.spacing(3),
    width: '100%',
    marginBottom: theme.spacing(),
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
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Vis />
        <Crop />
        <Year />
      </Paper>
      <Paper className={classes.paper}>
        <LineChart />
      </Paper>
      <Paper className={classes.paper}>
        <Barchart />
      </Paper>
    </Grid>
  );
};


export default Graphs;
