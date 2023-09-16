// components/AnalyticsData.js
import { useEffect, useState } from "react";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Panggil API yang telah Anda buat
    fetch("/api/analytics")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      });
  }, []);

  return (
    <div>
      <h1>Google Analytics Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
