import React from 'react';
import { PropTypes } from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, title, dataPoints, backgroundColor, legendPosition }) => {
  const data = {
    labels,
    color: '#fff',
    datasets: [
      {
        data: dataPoints,
        backgroundColor,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `${title} of Students`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      datalabels: {
        color: 'black',
        formatter: (value, context) => {
          const datapoints = context.dataset.data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          const totalValue = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalValue) * 100).toFixed(1);

          return `${percentageValue}%`;
        },
      },
      legend: {
        display: true,
        position: legendPosition,
      },
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
