import Head from 'next/head';
import DaftarLayanan from '../../components/DaftarLayanan';
import { useRouter } from 'next/router';

const SiswaBaru = () => {
  const router = useRouter();
  // program reguler
  const regulerString = router.query.datareg || '[]'; // Menggunakan "[]" sebagai default jika data tidak tersedia
  const regulerArray = JSON.parse(regulerString).map((value) =>
    decodeURIComponent(value)
  );

  // program snbt
  const snbtString = router.query.datasnbt || '[]'; // Menggunakan "[]" sebagai default jika data tidak tersedia
  const snbtArray = JSON.parse(snbtString).map((value) =>
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
      <DaftarLayanan regulerArray={regulerArray} snbtArray={snbtArray} />
    </div>
  );
};

export default SiswaBaru;
