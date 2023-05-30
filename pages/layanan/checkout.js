// pages/checkout.js
import { useState, useEffect } from 'react';

const Checkout = () => {
  const [paymentToken, setPaymentToken] = useState('');

  useEffect(() => {
    // Mengambil token pembayaran dari server
    const fetchPaymentToken = async () => {
      try {
        const response = await fetch('/api/midtrans/create-transaction');
        const data = await response.json();
        setPaymentToken(data.token);
      } catch (error) {
        console.error('Failed to fetch payment token:', error);
      }
    };

    fetchPaymentToken();
  }, []);

  return (
    <div>
      {paymentToken ? (
        <form
          method="POST"
          action="https://app.sandbox.midtrans.com/snap/v1/transactions">
          <input type="hidden" name="token" value={paymentToken} />
          <button type="submit">Bayar Sekarang</button>
        </form>
      ) : (
        <p>Mengambil token pembayaran...</p>
      )}
    </div>
  );
};

export default Checkout;
