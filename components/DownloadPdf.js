// components/DownloadPdf.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadPdf = () => {
  const handleDownload = async () => {
    const element = document.getElementById('page-content');
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  return (
    <div>
      <div id="page-content">
        {/* Konten halaman yang ingin didownload sebagai PDF */}
        <h1>Halaman Saya</h1>
        <p>Ini adalah contoh halaman yang akan didownload sebagai PDF.</p>
      </div>
      <div className="flex items-center justify-center bg-gray-600 p-2 m-2">
          <button onClick={handleDownload} className="text-gray-50 font-semibold">Download Hasil</button>
        </div>
    </div>
  );
};

export default DownloadPdf;
