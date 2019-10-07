import React from 'react';
import { VictoryChart, VictoryTooltip, VictoryAxis, VictoryBar } from 'victory';

const Barchart = ({ data, x, y }) => {
  // TODO: pass click event to map to select state
  const clickFunc = (id) => console.log('clicked: ', id);
  const mouseInFunc = (id) => console.log('mouseIn: ', id);
  const mouseOuteFunc = (id) => console.log('mouseOut: ', id);
  return (
    <VictoryChart height={window.innerHeight * 0.25} padding={{ top: 0, bottom: 0, left: 50, right: 12 }} domainPadding={8} animate={{ duration: 500 }}>
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
        labelComponent={<VictoryTooltip style={{ fontSize: 10, fill: 'white' }} flyoutStyle={{ fill: '#4F834D', stroke: '#FFFFFF', strokeWidth: 1 }} />}
        x={x}
        y={y}
        barWidth={10}
        style={{ data: { fill: '#4F834D' } }}
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

export default Barchart;
