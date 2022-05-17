import React from 'react';
import { PropTypes } from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, title, dataPoints, backgroundColor, legendPosition }) => {
  const data = {
    labels,
    datasets: [
      {
        label: `${title} of Students`,
        data: dataPoints,
        backgroundColor,
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: legendPosition,
    },
  };

  return <Pie data={data} options={options} />;
};

PieChart.defaultProps = {
  title: '',
  legendPosition: 'top',
};

PieChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  backgroundColor: PropTypes.arrayOf(PropTypes.number).isRequired,
  legendPosition: PropTypes.string,
};

export default PieChart;
