import Head from "next/head";

// Import Layouts
import Container from "../layouts/Container";

// Import components
import FullpageLanding from "../components/FullpageLanding";
import BuildsWrapper from "../components/BuildsWrapper";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>PC Gaming Hub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullpageLanding />
      <Container>
        <section className="text-sm md:text-lg text-center md:text-left">
          <div className="flex justify-center">
            <h1 className="mt-12 mb-4 inline-block text-5xl border-b-4 border-indigo-500 leading-tight text-center">Benvenuto!</h1>
          </div>
          <div className="text-gray-700 md:text-xl">
            <p>PC Gaming Hub nasce dall’idea di voler rendere semplice e alla portata di tutti l’assemblaggio di un computer.</p>
            <p>
              Il nostro sistema per la creazione delle build è in grado di scegliere tra migliaia di componenti hardware e creare il computer su misura per te. Che tu
              stia cercando un PC economico per l’ufficio o un PC di fascia professionale adatto a lavori impegnativi, il nostro sito ti indicherà sempre le build
              migliori al miglior prezzo, massimizzando il rapporto spesa/guadagno.
            </p>
          </div>
        </section>
        <BuildsWrapper />
      </Container>
      <Footer />
    </>
  );
}
