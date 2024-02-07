import React from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const LineChart = (props: {
  dataLabel: string;
  labels: number[];
  stats: any;
}) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
  };

  const data: ChartData<'line'> = {
    labels: props.labels.map((label) => label),
    datasets: [
      {
        label: props.dataLabel,
        data: props.stats,
        backgroundColor: '#33cc33',
        borderColor: '#33cc33',
      },
    ],
  };
  return <Line data={data} options={options} />;
};
