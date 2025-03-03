import "../styles/globals.css";
import "../styles/prism.css";
// import { Montserrat } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Script from "next/script";
import customHeaders from "../libs/middlewares/setCookieAll";
import VoiceControl from "../components/VoiceControl";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


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
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DYQLVBYP7G"
      ></Script>
      <Script>
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DYQLVBYP7G')`}
        ;
      </Script>

      <main >
        <Component {...pageProps} />
        <VoiceControl/>
        {/* cek di analitik vercel */}
        <Analytics /> 
        <SpeedInsights />
      </main>
    </SessionProvider>
    // <main>
    //   <Component {...pageProps} />
    // </main>
    // <main className={`${montserrat.variable} font-montserrat`}>
    //   <Component {...pageProps} />
    // </main>
  );
}

export default customHeaders(MyApp);
