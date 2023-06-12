// pages/checkout.js
import { useState, useEffect } from 'react';
import PaymentPage from '../../components/PaymentPage';
import { useRouter } from 'next/router';

const Checkout = () => {
  const router = useRouter();
  const { nama, kelas, asalsekolah, wa, email, program, biaya } = router.query;
  const [paymentToken, setPaymentToken] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    // Mengambil token pembayaran dari server
    const fetchPaymentToken = async () => {
      try {
        const response = await fetch('/api/create-transaction');
        const data = await response.json();
        const mytoken = data.transactionToken;
        const myRedirectUrl = data.transactionRedirectUrl;

        // console.log(data.transactionToken);
        setPaymentToken(mytoken);
        setRedirectUrl(myRedirectUrl);
      } catch (error) {
        console.error('Failed to fetch payment token:', error);
      }
    };

    fetchPaymentToken();
  }, []);

  return (
    <div>
      {paymentToken ? (
        // <form method="POST" action={redirectUrl}>
        //   {/* <input type="hidden" name="token" value={paymentToken} /> */}
        //   <button type="submit">Bayar Sekarang</button>
        // </form>
        <PaymentPage
          token={paymentToken}
          dataSiswa={{
            nama,
            kelas,
            asalsekolah,
            wa,
            email,
            program,
            biaya,
          }}
        />
      ) : (
        <p>Mengambil token pembayaran...</p>
      )}
    </div>
  );
};

export default Checkout;
