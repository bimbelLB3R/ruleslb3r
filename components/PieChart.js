import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';

// Daftarkan plugin custom
ChartJS.register(ArcElement, Tooltip, Legend, {
  id: 'customPlugin',
  afterDraw: (chart) => {
    // console.log("Drawing image in the center"); // Memastikan plugin terpanggil
    const ctx = chart.ctx;
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    const img = new Image();
    img.src = '/image/iconlb3r.png'; // Pastikan path gambar benar

    img.onload = () => {
      const imgWidth = 100;
      const imgHeight = 100;
      ctx.drawImage(img, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
    };
  }
});

const PieChart = ({ data, imageSrc }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Persentase',
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default PieChart;
