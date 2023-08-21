import "../styles/globals.css";
import "../styles/prism.css";
// import { Montserrat } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
// });
function MyApp({ Component, pageProps, session }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
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
