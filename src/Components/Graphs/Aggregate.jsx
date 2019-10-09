import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { VictoryChart, VictoryTooltip, VictoryAxis, VictoryStack, VictoryArea } from 'victory';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));

const CropChange = ({ aggregate, vis }) => (
  <VictoryChart
    height={window.innerHeight * 0.15}
    padding={{ top: 15, bottom: 24, left: 50, right: 60 }}
    domainPadding={0}
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
      tickFormat={(x) => (`${x * 0.001}k`)}
      style={{
        tickLabels: { fontSize: 12, fontFamily: 'sans-serif' },
      }}
    />
    <VictoryStack
      labels={({ datum }) => {
        console.log(datum);
        return datum._y;
      }}
      labelComponent={<VictoryTooltip style={{ fontSize: 10, fill: 'white' }} flyoutStyle={{ fill: '#006d2c', stroke: '#FFFFFF', strokeWidth: 1 }} />}
    >
      {aggregate.map((crop) => (
        <VictoryArea
          key={`${crop.crop}-totals`}
          data={crop.years}
          style={{
            data: {
              fill: () => ({
                CORN: '#FFFBCE',
                COTTON: '#68A7FF',
                RICE: '#006D2C',
                SOYBEANS: '#818856',
                WHEAT: '#8EE89C',
              }[crop.crop]),
              stroke: '#fff',
            },
          }}
          x="year"
          y={vis}
        />
      ))}
    </VictoryStack>
  </VictoryChart>
);

const HarvestedAcres = ({ county, state, vis, aggregate }) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h6">{!county && !state ? 'National Totals' : `${county || state} Totals`}</Typography>
      <CropChange aggregate={aggregate} vis={vis} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  county: state.data.county,
  state: state.data.state,
  vis: state.map.vis,
  aggregate: state.map.aggregate,
});

export default connect(mapStateToProps, null)(HarvestedAcres);
