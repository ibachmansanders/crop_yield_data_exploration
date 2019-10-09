import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { updateParam } from '../../reducers/map';

const styles = makeStyles((theme) => ({
  root: {
    left: 6,
    bottom: 40,
    padding: theme.spacing(),
    position: 'absolute',
    zIndex: 1,
  },
  swatches: {
    padding: theme.spacing(),
    display: 'flex',
  },
  swatch: {
    padding: theme.spacing(),
    marginRight: theme.spacing(2),
    border: '2px solid #006d2c',
  },
}));

const Vis = ({ quantiles, vis }) => {
  const classes = styles();
  const { bin1, bin2, bin3, bin4, bin5 } = quantiles;
  let title = 'Crop Yield (Bushels / Acre)';
  if (vis === 'total_harvested_acres') title = 'Harvested Acres';
  if (vis === 'total_production') title = 'Crop Production';
  return (
    <Paper className={classes.root}>
      <Typography varient="button">{title}</Typography>
      <div className={classes.swatches}>
        <div className={classes.swatch} style={{ backgroundColor: '#0084A7', color: 'white' }}>
          No data
        </div>
        {bin1 ? (
          <>
            <div className={classes.swatch} style={{ backgroundColor: '#edf8e9' }}>
              &lt; {bin1}
            </div>
            <div className={classes.swatch} style={{ backgroundColor: '#bae4b3' }}>
              &lt;= {bin2}
            </div>
            <div className={classes.swatch} style={{ backgroundColor: '#74c476' }}>
              &lt;= {bin3}
            </div>
            <div className={classes.swatch} style={{ backgroundColor: '#31a354' }}>
              &lt;= {bin4}
            </div>
            <div className={classes.swatch} style={{ backgroundColor: '#006d2c', color: 'white' }}>
              &lt;= {bin5}
            </div>
          </>
        ) : null}
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  quantiles: state.data.quantiles,
  vis: state.map.vis,
});

const mapDispatchToProps = (dispatch) => ({ updateParam: (payload) => dispatch(updateParam(payload)) });

export default connect(mapStateToProps, mapDispatchToProps)(Vis);
