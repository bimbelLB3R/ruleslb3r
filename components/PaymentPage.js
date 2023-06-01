import { useEffect } from 'react';
import Head from 'next/head';

export default function PaymentPage({ token, dataSiswa }) {
  const { nama, kelas, asalsekolah, wa, email, program, biaya } = dataSiswa;
  useEffect(() => {
    const loadSnapScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', 'SB-Mid-client-OApTd2fMRIW4rZ_c');
      // Add other script attributes as needed

      document.body.appendChild(script);
    };

    loadSnapScript();
  }, []);

  const handlePayment = () => {
    const transactionToken = token;
    if (window.snap) {
      window.snap.pay(transactionToken);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>DETAIL PEMBAYARAN</h1>
        <p>Nama : {nama}</p>
        <p>Program : {program}</p>
        <p>Total Pembayaran : {biaya}</p>
      </div>
      <button id="pay-button" onClick={handlePayment}>
        Bayar!
      </button>
    </>
  );
}
