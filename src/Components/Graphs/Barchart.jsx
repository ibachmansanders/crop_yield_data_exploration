import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { VictoryChart, VictoryTooltip, VictoryAxis, VictoryBar } from 'victory';

import getColor from '../../utils/getColor';
import capitalize from '../../utils/capitalize';

const Barchart = ({ data, vis, quantiles, scope }) => {
  // TODO: pass click event to map to select state
  const clickFunc = (id) => console.log('clicked: ', id);
  const mouseInFunc = (id) => console.log('mouseIn: ', id);
  const mouseOuteFunc = (id) => console.log('mouseOut: ', id);

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
  if (data.length > 50) data = data.slice(0, 50);

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
          tickFormat={(tick) => {
            if (y === 'total_yield') return tick;
            if (y === 'total_harvested_acres') return `${Number(tick) * 0.001}k`;
            if (y === 'total_production') return `${(Number(tick) * 0.00000001).toFixed()}m`;
          }}
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Barchart);
