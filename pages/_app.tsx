import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";
import { useEffect } from "react";
import { AppProps } from "next/app";

import "../styles/globals.css";
// Import Tailwindcss
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
