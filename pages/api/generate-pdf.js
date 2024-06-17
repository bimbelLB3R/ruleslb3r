import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export default async (req, res) => {
  const { type } = req.query;
  let browser = null;

  try {
    // Launch browser using chrome-aws-lambda
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.bimbellb3r.com/blogs/${type}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });
    await page.addStyleTag({ content: '@media print {.no-print { display: none; }}' });

    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '3cm',
        right: '3cm',
        bottom: '3cm',
        left: '3cm',
      },
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=halaman.pdf');
    res.send(pdf);
  } catch (error) {
    if (browser) await browser.close();
    res.status(500).send('Error generating PDF: ' + error.message);
  }
};
