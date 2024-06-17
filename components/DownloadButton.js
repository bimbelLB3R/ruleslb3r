// components/DownloadButton.js
import React, { useState } from 'react';
import Loader from './Loader'

const DownloadButton = ({ type}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/generate-pdf?type=${type}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError('Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <button onClick={handleDownload} disabled={loading} className="w-8 h-8 bg-gray-400 text-gray-50 rounded-full p-1 ">
            {loading ? '...':<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>}
            
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DownloadButton;
