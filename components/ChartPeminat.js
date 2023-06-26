import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartPeminat = ({ data }) => {
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
            label: "Peminat",
            data: data.values,
            backgroundColor: "#e879f9", // Warna latar belakang batang
            borderColor: "#d946ef", // Warna garis batang
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

export default ChartPeminat;
