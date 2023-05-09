import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
function MyApp({ Component, pageProps }) {
  return (
    // <main>
    //   <Component {...pageProps} />
    // </main>
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
