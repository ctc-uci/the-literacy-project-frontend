import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Graph = ({ title, xLabels, preData, postData }) => {
  const yellow = 'rgb(255, 211, 80)';
  const teal = 'rgb(23, 162, 184)';
  const textColor = 'rgb(95, 117, 141)';
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      legend: {
        display: true,
      },
      // show percentage above each bar
      datalabels: {
        display: true,
        color: textColor,
        anchor: 'end',
        offset: -20,
        align: 'start',
        formatter: value => (value ? `${value?.toFixed(2)}%` : null), // return percentage rounded to 2 decimal places
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        stepSize: 10,
        title: {
          display: true,
          text: 'Average Score (%)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        labels: xLabels,
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  const data = {
    xLabels,
    datasets: [
      {
        label: 'Pre',
        data: preData,
        backgroundColor: yellow,
      },
      {
        label: 'Post',
        data: postData,
        backgroundColor: teal,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

Graph.defaultProps = {
  title: '',
};

Graph.propTypes = {
  title: PropTypes.string,
  xLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  preData: PropTypes.arrayOf(PropTypes.number).isRequired,
  postData: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Graph;
