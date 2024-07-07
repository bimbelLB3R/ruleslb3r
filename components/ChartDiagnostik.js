import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartDiagnostik = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    const ctx = chartRef.current.getContext("2d");

    // Calculate the total sum of the values
    const total = data.values.reduce((sum, value) => sum + value, 0);

    // Calculate the percentage of each value
    const percentageValues = data.values.map(value => (value / total) * 100);

    // Find the index of the highest percentage
    const maxIndex = percentageValues.indexOf(Math.max(...percentageValues));
    
    // Create an array of background colors, defaulting to a base color
    const backgroundColors = percentageValues.map((value, index) =>
      index === maxIndex ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)"
    );

    // Create an array of border colors, defaulting to a base color
    const borderColors = percentageValues.map((value, index) =>
      index === maxIndex ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
    );

    const labelColors = data.labels.map((label, index) =>
      index === maxIndex ? "rgba(255, 99, 132, 1)" : "rgba(0, 0, 0, 1)"
    );

    // Plugin to change label colors
    const labelColorPlugin = {
      id: 'labelColorPlugin',
      afterDraw: chart => {
        const xAxis = chart.scales.x;
        xAxis.ticks.forEach((tick, index) => {
          const color = labelColors[index];
          const label = xAxis.getLabelForValue(tick.value);
          const ctx = chart.ctx;
          ctx.save();
          ctx.fillStyle = color;
          ctx.fillText(label, xAxis.getPixelForTick(index), xAxis.bottom + 10);
          ctx.restore();
        });
      }
    };

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
            label: "Gaya Belajar Dominan (%)",
            data: percentageValues,
            backgroundColor: backgroundColors, // Set background colors
            borderColor: borderColors, // Set border colors
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + "%"; // Add '%' sign to y-axis labels
              }
            }
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.raw.toFixed(2) + "%"; // Add '%' sign to tooltip values
              }
            }
          }
        }
      },
      plugins: [labelColorPlugin]
    });

    return () => {
      chartInstance.destroy(); // Clean up the chart instance on component unmount
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartDiagnostik;
