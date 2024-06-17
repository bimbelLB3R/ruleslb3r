// pages/api/generate-pdf.js
import puppeteer from 'puppeteer';

export default async (req, res) => {
    const { type } = req.query;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   jika ingin menampilkan pesan eror, tambahkan
    // headless: false, // Ini akan menampilkan browser untuk debugging
  });
  const page = await browser.newPage();
//   jika ingin menampilkan pesan eror, tambahkan
//   page.on('console', msg => console.log('PAGE LOG:', msg.text())); // Log pesan dari halaman
  
  try {
    await page.goto(`http://localhost:3000/blogs/${type}`, { waitUntil: 'networkidle0', timeout: 60000 });
    // menambahkan ini agar komponen yang diberi class no-print tidak tampil di pdf
    await page.addStyleTag({ content: '@media print {.no-print { display: none; }}' });
    // jika data yang mau di pdf bersifat dinamis, tambahkan
    // await page.waitForSelector('#content'); // Ganti dengan selector elemen yang ingin ditunggu, kurang efektif untuk data yang ngambil dr spreadsheet.

    const pdf = await page.pdf({ format: 'A4',margin: {
        top: '3cm',
        right: '3cm',
        bottom: '3cm',
        left: '3cm'
      } });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=halaman.pdf');
    res.send(pdf);
  } catch (error) {
    await browser.close();
    res.status(500).send('Error generating PDF: ' + error.message);
  }
};
