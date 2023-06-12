import axios from 'axios';

export default async function handler(req, res) {
  const tokenKiriman = req.body;
  const token = tokenKiriman.token;
  console.log(token); //bener

  const snapApiUrl = 'https://app.midtrans.com/snap/v1/transactions';
  const snapServerKey = 'Mid-server-zzOiNRXtsXKskJUV-kAyWdD1';
  const transactionInfoUrl = `https://app.midtrans.com/snap/v1/transactions/${token}`;
  console.log(transactionInfoUrl); //bener

  // Set request headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(snapServerKey).toString('base64')}`,
  };

  try {
    const response = await axios.get(transactionInfoUrl, { headers });
    const transactionQris = response.data;
    console.log('transactionQris:', transactionQris);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ transactionQris });
  } catch (error) {
    console.log('Error occurred:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to create transaction' });
  }
}
