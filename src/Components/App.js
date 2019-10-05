import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Route } from 'react-router-dom';

import Map from './Map';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#83B87F',
      contrastText: '#000',
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
      <Route path="/" component={Map} />
    </ThemeProvider>
  </>
);

export default App;
