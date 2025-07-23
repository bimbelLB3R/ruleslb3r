import Head from "next/head";
import Loginmembertka from "../../components/Loginmembertka";
const login = () => {
  return (
    <div>
      <Head>
        <title>Login Peserta TKA | Bimbel LB3R</title>
        <meta
          name="description"
          content="Sesuai dengan keputusan Menteri Pendidikan, maka sejak tahun 2025 siswa kelas 6 SD,9 SMP dan 12 SMA diprioritaskan mengikuti TKA untuk melanjutkan ke jenjang pendidikan yang lebih tinggi"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>
      {/* <Loginmember /> */}
      <Loginmembertka/>
    </div>
  );
};

export default login;
