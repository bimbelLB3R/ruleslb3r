import Head from "next/head";
import Script from "next/script";

const Meta = () => (
  <Head>
    <meta
      name="facebook-domain-verification"
      content="ek06py9lhpjjkgfpxcvpomnqywkbn7"
    />
    <meta
      property="og:image"
      itemProp="image"
      content="https://raw.githubusercontent.com/bimbelLB3R/bimbellb3r.github.io/main/img/slider/og.jpg"
    />
    <meta
      property="og:description"
      content="Pilihan Belajar Tepat, Budget Hemat !!!"
    />
    <meta name="keywords" content="bimbel LB3R SNBT " />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LB3R |OFFICIAL</title>
    <link rel="icon" type="image/png" sizes="4x16" href="image/logolb3r.png" />
    <meta
      name="description"
      content="Pembelajaran di Bimbel LB3R sangat fleksibel sesuai kebutuhan siswa. Siswa dapat membuat kelas sendiri dan mengatur jadwalnya. Pembayaran les di bimbel LB3R juga sangat fleksibel, yaitu sistem bulanan. Siswa dapat berhenti sementara dan kemudian lanjut bulan berikutnya. Dari segi pelayanan dan tempat belajar, kami mengutamakan kenyamanan."
      key="desc"
    />
    <meta
      name="google-site-verification"
      content="E5IKh82N4mjraBEM96ptZIJd2VU22yfjOqiKWuE6RHU"
    />
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTIC_PENGUKURAN}`}
    />
    <Script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTIC_PENGUKURAN}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </Head>
);

export default Meta;
