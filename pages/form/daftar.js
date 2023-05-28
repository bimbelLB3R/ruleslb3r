import Head from 'next/head';
import DaftarLayanan from '../../components/DaftarLayanan';
import { useRouter } from 'next/router';

const SiswaBaru = () => {
  const router = useRouter();
  const regulerString = router.query.datareg || '[]'; // Menggunakan "[]" sebagai default jika data tidak tersedia
  const regulerArray = JSON.parse(regulerString).map((value) =>
    decodeURIComponent(value)
  );
  return (
    <div>
      <Head>
        <title>Formulir Pendaftaran ... | Bimbel LB3R</title>
        <meta
          name="description"
          content="Bimbel LB3R menyelenggarakan bimbingan UTBK SNBT dan memberikan latihan soal dengan metode Item Response Theory (IRT)"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>
      <DaftarLayanan regulerArray={regulerArray} />
    </div>
  );
};

export default SiswaBaru;
