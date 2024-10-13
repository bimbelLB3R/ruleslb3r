import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SpiderChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Nama kelompok atau label
    datasets: [
      {
        label: 'Persentase Kelompok',
        data: data.values, // Nilai persentase dari kelompok
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: { beginAtZero: true, max: 100 }, // Sesuaikan range persentase
    },
  };

  return <Radar data={chartData} options={chartOptions} />;
};

export default SpiderChart;
