// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <meta name="theme-color" content="#581c87" />
          <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap"
          rel="stylesheet"
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
