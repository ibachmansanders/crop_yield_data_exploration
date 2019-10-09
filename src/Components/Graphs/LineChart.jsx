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
    width: 50,
    color: 'white',
    marginLeft: theme.spacing(2),
  },
  prompt: {
    color: 'indianred',
    paddingLeft: theme.spacing(),
  },
}));

const LineChart = ({ selectedData, vis }) => {
  const classes = styles();
  // set up title
  let title = 'Crop Yield (Bushels / Acre)';
  if (vis === 'total_harvested_acres') title = 'Harvested Acres';
  if (vis === 'total_production') title = 'Total Production';
  title += ' by Year';
  return (
    <>
      <div className={classes.legend}>
        <Typography variant="h6">{title}</Typography>
        {selectedData.map(({ name }, index) => (
          <div className={classes.swatch} style={{ backgroundColor: config.selectColors[index] }}>{name}</div>
        ))}
        {!selectedData.length ? <Typography variant="caption" className={classes.prompt}> *Select from the map to compare</Typography> : null}
      </div>
      {selectedData.length ? (
        <VictoryChart
          height={window.innerHeight * 0.25}
          padding={{ top: 12, bottom: 24, left: 50, right: 60 }}
          domainPadding={16}
          animate={{ duration: 500 }}
        >
          {console.log(selectedData)}
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

const mapStateToProps = (state) => ({ selectedData: state.data.selectedData, vis: state.map.vis });

export default connect(mapStateToProps, null)(LineChart);
