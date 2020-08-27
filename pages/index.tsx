import Head from "next/head";

// Import Layouts
import Container from "../layouts/Container";

// Import components
import FullpageLanding from "../components/FullpageLanding";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullpageLanding />
    </>
  );
}
