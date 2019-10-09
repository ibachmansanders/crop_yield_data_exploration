import React from 'react';
import { connect } from 'react-redux';

const LineChart = ({ selectedData }) => {
  return (
    <div>
      {selectedData.map(({ name }) => <p>{name}</p>)}
    </div>
  );
};

const mapStateToProps = (state) => ({ selectedData: state.data.selectedData });

export default connect(mapStateToProps, null)(LineChart);
