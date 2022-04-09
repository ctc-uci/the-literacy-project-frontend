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

const Graph = ({ title, xLabels, graphData }) => {
  const yellow = 'rgb(255, 211, 80)';
  const teal = 'rgb(23, 162, 184)';
  const dataTextColor = 'rgb(95, 117, 141)';
  const options = {
    responsive: true,
    events: [],
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: dataTextColor,
        anchor: 'end',
        offset: -20,
        align: 'start',
        formatter: value => {
          return `${value}%`;
        },
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
        },
      },
      x: {
        labels: ['Pre', 'Post', 'Pre', 'Post'],
      },
      secondXAxis: {
        axis: 'x',
        labels: xLabels,
      },
    },
  };

  const data = {
    xLabels,
    datasets: [
      {
        label: 'Pre',
        data: graphData,
        backgroundColor: [yellow, yellow, teal, teal],
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  xLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  graphData: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Graph;
