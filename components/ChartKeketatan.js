import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartKeketatan = ({ data }) => {
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
            label: "Keketatan",
            data: data.values,
            backgroundColor: "#facc15", // Warna latar belakang batang
            borderColor: "#eab308", // Warna garis batang
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

export default ChartKeketatan;
