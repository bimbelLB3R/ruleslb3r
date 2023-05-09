import '../styles/globals.css';
// import { Montserrat } from 'next/font/google';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
// });
function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
    // <main className={`${montserrat.variable} font-montserrat`}>
    //   <Component {...pageProps} />
    // </main>
  );
}

export default MyApp;
