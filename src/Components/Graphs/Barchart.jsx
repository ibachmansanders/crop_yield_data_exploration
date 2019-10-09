import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { VictoryChart, VictoryTooltip, VictoryAxis, VictoryBar } from 'victory';

import getColor from '../../utils/getColor';
import capitalize from '../../utils/capitalize';
import axisNumber from '../../utils/axisNumber';

const Barchart = ({ data, vis, quantiles, scope, crop, stateLayer, countyLayer }) => {
  // TODO: pass click event to app for comparison
  const clickFunc = (id) => {
    console.log('clicked: ', id);
  };
  const mouseInFunc = (id) => {
    // select the matching map feature and highlight it
    if (scope === 'state') {
      stateLayer.forEach((feature) => {
        const value = feature.getProperty('state_code');
        if (value === id) stateLayer.overrideStyle(feature, { fillOpacity: 1, strokeWeight: 2 });
      });
    }
    if (scope === 'county') {
      countyLayer.forEach((feature) => {
        const value = feature.getProperty('county_fips');
        if (value === id) countyLayer.overrideStyle(feature, { fillOpacity: 1, strokeWeight: 2 });
      });
    }
  };
  const mouseOuteFunc = (id) => {
    // select the matching map feature and remove the highlight
    if (scope === 'state') {
      stateLayer.forEach((feature) => {
        const value = feature.getProperty('state_code');
        if (value === id) stateLayer.overrideStyle(feature, { fillOpacity: null, strokeWeight: 1 });
      });
    }
    if (scope === 'county') {
      countyLayer.forEach((feature) => {
        const value = feature.getProperty('county_fips');
        if (value === id) countyLayer.overrideStyle(feature, { fillOpacity: null, strokeWeight: 1 });
      });
    }
  };

  // set up axis properties
  const x = 'name';
  const y = vis;


  // set up chart title
  let title = 'Crop Yield (Bushels / Acre)';
  if (vis === 'total_harvested_acres') title = 'Harvested Acres';
  if (vis === 'total_production') title = 'Total Production';
  title += ` by ${capitalize(scope)}`;
  if (data.length > 50) title = `Top 50 ${title} (out of ${data.length})`;

  // limit data to top 300
  if (data.length > 50) {
    data.sort((a, b) => {
      if (a[vis] > b[vis]) return -1;
      if (a[vis] < b[vis]) return 1;
      return 0;
    });
    // TODO: perhaps aggregate data into 50 groups?
    data = data.filter((row) => !row.name.includes('OTHER (COMBINED) COUNTIES')).slice(0, 50);
  }

  // catch when there's no data available
  if (!data.length) return <Typography variant="button">No {crop} data available for this year</Typography>;
  // catch when there's no specific property data available
  if (!data.filter((row) => row[vis] > 0).length) return <Typography variant="button">No {crop} {vis.replace(/_/g, ' ')} data available for this year</Typography>;

  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <VictoryChart
        height={window.innerHeight * 0.15}
        padding={{ top: 15, bottom: 0, left: 50, right: 60 }}
        domainPadding={8}
        animate={{ duration: 500 }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => axisNumber(tick)}
          style={{
            tickLabels: { fontSize: 12, fontFamily: 'sans-serif' },
          }}
        />
        <VictoryBar
          data={data.length ? data : null}
          labels={({ datum }) => `${datum.name} - ${datum[y] ? datum[y].toLocaleString() : ''}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10, fill: 'white' }} flyoutStyle={{ fill: '#006d2c', stroke: '#FFFFFF', strokeWidth: 1 }} />}
          x={x}
          y={y}
          sortKey="y"
          sortOrder="descending"
          barRatio={1}
          alignment="start"
          style={{
            data: {
              fill: ({ datum }) => getColor(datum._y, quantiles),
              stroke: '#fff',
              strokeWidth: 1,
            },
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => [{
                  target: 'data',
                  mutation: ({ datum: { id } }) => {
                    clickFunc(id);
                    return null;
                  },
                }],
                onMouseOver: () => [
                  {
                    target: 'data',
                    mutation: ({ datum: { id } }) => {
                      mouseInFunc(id);
                      return null;
                    },
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: true }),
                  },
                ],
                onMouseOut: () => [
                  {
                    target: 'data',
                    mutation: ({ datum: { id } }) => {
                      mouseOuteFunc(id);
                      return null;
                    },
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: false }),
                  },
                ],
              },
            },
          ]}
        />
      </VictoryChart>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data.barChartData,
  quantiles: state.data.quantiles,
  vis: state.map.vis,
  scope: state.map.scope,
  crop: state.map.crop,
  stateLayer: state.map.stateLayer,
  countyLayer: state.map.countyLayer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Barchart);
