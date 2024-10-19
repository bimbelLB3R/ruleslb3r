import { useState } from "react";

export default function SkewnessCalculator() {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Example data
  const [skewness, setSkewness] = useState(null);

  // Function to calculate skewness
  function calculateSkewness(data) {
    const n = data.length;
    if (n < 3) {
      return null; // Skewness calculation requires at least 3 data points.
    }

    const mean = data.reduce((sum, value) => sum + value, 0) / n;

    // Calculate the standard deviation
    const sumSquaredDiff = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
    const standardDeviation = Math.sqrt(sumSquaredDiff / (n - 1));

    // Calculate the skewness
    const sumCubedDiff = data.reduce((sum, value) => sum + Math.pow((value - mean) / standardDeviation, 3), 0);
    const skewness = (n / ((n - 1) * (n - 2))) * sumCubedDiff;

    return skewness;
  }

  // Function to handle button click
  const handleCalculate = () => {
    const result = calculateSkewness(data);
    setSkewness(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Skewness Calculator</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <button
        onClick={handleCalculate}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Calculate Skewness
      </button>
      {skewness !== null && (
        <p className="mt-4">
          Skewness: <strong>{skewness}</strong>
        </p>
      )}
    </div>
  );
}
