import React from 'react';
import { connect } from 'react-redux';
import { VictoryChart, VictoryTooltip, VictoryAxis, VictoryBar } from 'victory';

import getColor from '../../utils/getColor';

const Barchart = ({ data, x, y, quantiles }) => {
  // TODO: pass click event to map to select state
  const clickFunc = (id) => console.log('clicked: ', id);
  const mouseInFunc = (id) => console.log('mouseIn: ', id);
  const mouseOuteFunc = (id) => console.log('mouseOut: ', id);
  let barWidth = 10;
  if (document.getElementById('crop-graphs')) barWidth = (document.getElementById('crop-graphs').clientWidth - 200) / data.length;
  return (
    <VictoryChart
      height={window.innerHeight * 0.15}
      padding={{ top: 15, bottom: 0, left: 50, right: 60 }}
      domainPadding={8}
      animate={{ duration: 500 }}
    >
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x * 0.001}k`)}
        style={{
          tickLabels: { fontSize: 12, fontFamily: 'sans-serif' },
        }}
      />
      <VictoryBar
        data={data.length ? data : null}
        labels={({ datum }) => `${datum.name} - ${datum[y].toLocaleString()}`}
        labelComponent={<VictoryTooltip style={{ fontSize: 10, fill: 'white' }} flyoutStyle={{ fill: '#006d2c', stroke: '#FFFFFF', strokeWidth: 1 }} />}
        x={x}
        y={y}
        sortKey="y"
        sortOrder="descending"
        barWidth={barWidth}
        alignment="start"
        style={{
          data: {
            fill: ({ datum }) => getColor(datum._y, quantiles),
            stroke: '#fff',
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
  );
};

const mapStateToProps = (state) => ({
  quantiles: state.data.quantiles,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Barchart);
