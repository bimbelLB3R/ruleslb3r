import Newmember from '../../components/Newmember';
import Head from 'next/head';
import Newmembersup from '../../components/Newmembersup';

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
          href="/image/logolb3r.png"
        />
      </Head>
      {/* <Newmember /> */}
      <Newmembersup/>
    </div>
  );
};

export default newmember;
