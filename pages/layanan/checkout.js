import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function checkout() {
  const router = useRouter();
  const { query } = router;
  const qris_url = query.qris_url;
  console.log(qris_url);

  // // setelah dapat end poin, kita get
  // const getQris = async (qris_url) => {
  //   try {
  //     response = await axios.post('/api/getQris', qris_url);
  //     qris = response.data;
  //     return qris;
  //   } catch (error) {
  //     console.error('Failed to getqris_image:', error);
  //     return null;
  //   }
  // };
  // const gambarqris = await getQris(qris_url);
  // console.log(gambarqris);

  const namalengkap = query.namalengkap;
  const wa = query.wa;
  const kalipembayaran = query.kalipembayaran;
  const jumlah = query.jumlah;
  const bulan = query.bulan;
  const pesan = query.pesan;
  const total = jumlah * kalipembayaran;
  return (
    <>
      <Navbar />
      <Layout>
        <div className="flex items-center justify-center max-w-lg m-auto bg-blue-400">
          <div className="mt-20 w-full bg-slate-200">
            <div>
              <p>Data Pembeli</p>
              <div className="flex ">
                <div className="w-1/2">
                  <p>Nama</p>
                  <p>{namalengkap}</p>
                </div>
                <div className="w-1/2">
                  <p>Phone</p>
                  <p>{wa}</p>
                </div>
              </div>
            </div>
            <div>
              <p>Detail Pembayaran</p>
              <div className="flex ">
                <div className="w-1/2">
                  <p>Keterangan</p>
                  <p>
                    Pembayaran {bulan} ({kalipembayaran})
                  </p>
                  <p>Total</p>
                </div>
                <div className="w-1/2">
                  <p>Harga/Biaya per Item</p>
                  <p>{jumlah}</p>
                  {total}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div>
                <p>Scan QRIS</p>
                <div className="flex items-center justify-center w-[300px] h-[300px] bg-slate-400">
                  Here
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
