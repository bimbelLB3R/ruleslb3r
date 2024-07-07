import Logindiagnostik from "../../../components/Logindiagnostik";
import Head from "next/head";
const login = () => {
  return (
    <div>
      <Head>
        <title>Login Peserta Diagnostik | Bimbel LB3R</title>
        <meta
          name="description"
          content="Login Peserta Tes Diagnostik Gaya Belajar "
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>
      <Logindiagnostik/>
    </div>
  );
};

export default login;
