import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartDayaTampung = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    const ctx = chartRef.current.getContext("2d");
    // Create or update the chart instance
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart
    }

    chartInstance = new Chart(ctx, {
      // Chart configuration
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Daya Tampung",
            data: data.values,
            backgroundColor: "rgba(75, 192, 192, 0.6)", // Warna latar belakang batang
            borderColor: "rgba(75, 192, 192, 1)", // Warna garis batang
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy(); // Clean up the chart instance on component unmount
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartDayaTampung;
