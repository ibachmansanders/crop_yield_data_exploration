import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import Map from './Map';
import Graphs from './Graphs';
import Snackbar from './Snackbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4F834D',
      contrastText: '#FFF',
    }, // #ff4d00
    secondary: {
      main: '#0084A7',
      contrastText: '#FFF',
    },
  },
  status: {
    danger: 'orange',
  },
});

const App = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Snackbar />
      <Grid container spacing={0}>
        <Grid item xs={12} sm={7}>
          <Map />
        </Grid>
        <Grid item xs={12} sm={5} style={{ backgroundColor: 'rgba(233, 233, 233, 0.83)' }}>
          <Graphs />
        </Grid>
      </Grid>
    </ThemeProvider>
  </>
);

export default App;
