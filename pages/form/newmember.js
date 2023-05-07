import Newmember from '../../components/Newmember';
import Head from 'next/head';

const newmember = () => {
  return (
    <div>
      <Head>
        <title>Formulir Pendaftaran Peserta SNBT | Bimbel LB3R</title>
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
        <meta
          http-equiv="Content-Security-Policy"
          content="script-src 'none'"
        />
      </Head>
      <Newmember />
    </div>
  );
};

export default newmember;
