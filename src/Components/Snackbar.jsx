import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import { closeSnackbar } from '../reducers/feedback';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: 'red',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackbarContainer extends React.Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeSnackbar();
  };

  render() {
    const { classes, snackbar: { open, type, content } } = this.props;
    console.log(open);
    const Icon = variantIcon[type];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        disableWindowBlurListener
      >
        <SnackbarContent
          className={classes[type]}
          aria-describedby="client-snackbar"
          message={(
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classes.icon} style={{ marginRight: 4 }} />
              {content}
            </span>
)}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => ({
  snackbar: state.feedback,
});

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: () => dispatch(closeSnackbar()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer));
