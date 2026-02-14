import Loginmember from "../../components/Loginmember";
import Head from "next/head";
import LoginSnbtCf from "../../components/LoginSnbtCf";
const login = () => {
  return (
    <div>
      <Head>
        <title>Login Peserta SNBT | Bimbel LB3R</title>
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
      {/* <Loginmember /> */}
      <LoginSnbtCf/>
      {/* <p className="flex items-center justify-center m-auto h-screen">On Development ...</p> */}
    </div>
  );
};

export default login;
