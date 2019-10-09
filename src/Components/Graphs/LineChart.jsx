import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { VictoryChart, VictoryLabel, VictoryAxis, VictoryGroup, VictoryLine } from 'victory';
import Typography from '@material-ui/core/Typography';

import config from '../../config';
import axisNumber from '../../utils/axisNumber';

const styles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  legend: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(),
  },
  swatch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(),
    color: 'white',
    marginLeft: theme.spacing(2),
  },
  prompt: {
    color: 'indianred',
    paddingLeft: theme.spacing(),
  },
}));

const LineChart = ({ selectedData, selected, vis }) => {
  const classes = styles();
  // set up title
  let title = 'Crop Yield (Bushels / Acre)';
  if (vis === 'total_harvested_acres') title = 'Harvested Acres';
  if (vis === 'total_production') title = 'Total Production';
  title += ' by Year';
  // check if graph should show
  let show = false;
  const reducedValue = selectedData.reduce((acc, row) => {
    let val = 0;
    row.data.forEach(({ y }) => { val += y; });
    return acc + val;
  }, 0);
  if (reducedValue > 0) show = true;
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <div className={classes.legend}>
        {show && selected.length ? selectedData.map(({ name }, index) => (
          <div key={name} className={classes.swatch} style={{ backgroundColor: config.selectColors[index] }}>{name}</div>
        )) : null}
        {!selected.length ? <Typography variant="caption" className={classes.prompt}>*Select from the map to compare</Typography> : null}
        {!show && selected.length ? <Typography className={classes.prompt}>No data available</Typography> : null}
      </div>
      {show ? (
        <VictoryChart
          height={window.innerHeight * 0.2}
          padding={{ top: 12, bottom: 24, left: 50, right: 60 }}
          domainPadding={16}
          animate={{ duration: 500 }}
        >
          <VictoryAxis
            tickValues={[2014, 2015, 2016, 2017, 2018]}
            style={{
              tickLabels: { fontSize: 12, fontFamily: 'sans-serif' },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => axisNumber(y)}
            style={{
              tickLabels: { fontSize: 12, fontFamily: 'sans-serif' },
            }}
          />
          <VictoryGroup>
            {selectedData.map((f, index) => (
              <VictoryLine
                key={`${f.id}-totals`}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryLabel style={{ fontSize: 10 }} verticalAnchor="middle" />}
                data={f.data}
                style={{
                  data: {
                    stroke: config.selectColors[index],
                  },
                }}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedData: state.data.selectedData,
  selected: state.data.selected,
  vis: state.map.vis,
});

export default connect(mapStateToProps, null)(LineChart);
