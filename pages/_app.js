import "../styles/globals.css";
import "../styles/prism.css";
// import "../styles/prism";
// import { Montserrat } from 'next/font/google';
import { SessionProvider } from "next-auth/react";

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
// });
function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    // <main>
    //   <Component {...pageProps} />
    // </main>
    // <main className={`${montserrat.variable} font-montserrat`}>
    //   <Component {...pageProps} />
    // </main>
  );
}

export default MyApp;
