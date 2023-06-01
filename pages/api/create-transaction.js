import axios from 'axios';

export default async function handler(req, res) {
  const newRow = req.body;
  console.log(newRow);
  // const first_name = dataFromDaftarLayanan.nama;
  // menyimpan data dataFromDaftarLayanan ke local storage

  // This is just for very basic implementation reference, in production, you should validate the incoming requests and implement your backend more securely.
  // Please refer to this docs for snap popup:
  // https://docs.midtrans.com/en/snap/integration-guide?id=integration-steps-overview

  // Please refer to this docs for snap-redirect:
  // https://docs.midtrans.com/en/snap/integration-guide?id=alternative-way-to-display-snap-payment-page-via-redirect

  const snapApiUrl = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
  const snapServerKey = 'SB-Mid-server-EdNalvrIc1PCrcDoVVOnpRV2';

  // Prepare request body
  const requestBody = {
    transaction_details: {
      order_id: 'ORDER-102-{{$timestamp}}',
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    item_details: [
      {
        id: 'ITEM1',
        price: 10000,
        quantity: 1,
        name: 'Midtrans Bear',
      },
    ],
    customer_details: {
      first_name: newRow.nama,
      last_name: 'MIDTRANSER',
      email: 'noreply@example.com',
      phone: '+628123456',
      billing_address: {
        first_name: newRow.nama,
        last_name: 'MIDTRANSER',
        email: 'noreply@example.com',
        phone: '081 2233 44-55',
        address: 'Sudirman',
        city: 'Jakarta',
        postal_code: '12190',
        country_code: 'IDN',
      },
      shipping_address: {
        first_name: newRow.nama,
        last_name: 'MIDTRANSER',
        email: 'noreply@example.com',
        phone: '0812345678910',
        address: 'Sudirman',
        city: 'Jakarta',
        postal_code: '12190',
        country_code: 'IDN',
      },
    },
  };

  // Set request headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(snapServerKey).toString('base64')}`,
  };

  try {
    const response = await axios.post(snapApiUrl, requestBody, { headers });
    const transactionToken = response.data.token;
    console.log('transactionToken:', transactionToken);

    // transaction redirect url
    const transactionRedirectUrl = response.data.redirect_url;
    console.log('transactionRedirectUrl:', transactionRedirectUrl);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ transactionToken, transactionRedirectUrl });
  } catch (error) {
    console.log('Error occurred:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to create transaction' });
  }
}
