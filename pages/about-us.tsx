import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Container from "../layouts/Container";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Chi Siamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navbar landing={false} />
        <section className="md:text-xl">
          <div className="flex justify-center">
            <h1 className="mt-12 mb-4 inline-block text-5xl border-b-4 border-indigo-500 leading-tight text-center">Chi Siamo</h1>
          </div>
          <p className="text-gray-700 text-center">PC Gaming Hub nasce dall’idea di voler rendere semplice e alla portata di tutti l’assemblaggio di un computer.</p>

          <div className="flex justify-center">
            <div style={{ height: "1px" }} className="w-2/3 my-32 bg-gray-400"></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <h3 className="md:border-l-2 md:pl-10 border-black md:w-80 mb-12 md:mb-0 text-center md:text-left text-black text-3xl leading-none tracking-tight">
                <div className="text-5xl leading-none m-0 p-0 hidden md:block">"</div>Un pc deve adattarsi al suo possessore, non l'incontrario
              </h3>
            </div>
            <div className="flex-1 text-gray-700 text-base text-justify">
              <p>
                Sappiamo che in molti vorrebbero avvicinarsi al mondo del custom building, ma che per paura o inesperienza optano per un PC già assemblato in negozio
                piuttosto che costruirne uno da sé.
              </p>
              <p className="mt-4">
                La maggior parte delle persone vorrebbe un computer in grado di svolgere una precisa mansione, ma non sa quali siano le parti hardware necessarie per
                svolgere il compito e, per evitare di fare un acquisto sbagliato, scelgono di affidarsi ai negozi. Questo sito ha l’obiettivo di rompere la barriera che
                si sovrappone tra l’utente e la scelta giusta dei componenti.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div style={{ height: "1px" }} className="w-2/3 my-32 bg-gray-400"></div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
