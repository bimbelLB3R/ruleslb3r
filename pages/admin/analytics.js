import Head from "next/head";
import Analytics from "../../components/Analytics";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Google Analytics Data</title>
      </Head>

      <main>{/* <Analytics /> */}</main>
    </div>
  );
}
