import Loginmember from "../../components/Loginmember";
import Head from "next/head";
import Loginmembersupa from "../../components/Loginmembersupa";
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
      <Loginmembersupa/>
    </div>
  );
};

export default login;
