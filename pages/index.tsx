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
        <section className="text-sm md:text-lg">
          <h3 className="mt-12 mb-4 inline-block text-3xl font-semibold border-b-4 border-indigo-500 leading-tight">Benvenuto</h3>
          <p>Questo sito nasce per rendere meno impervia la strada che ti separa dal tuo prossimo PC desktop.</p>
          <p>
            Sappiamo bene che districarsi tra una miriade di componenti è un'impresa ardua, per questo motivo abbiamo pensato di agevolarti nella scelta andando a
            selezionare per te la migliore configurazione per ogni possibile fascia di prezzo.
          </p>
          <p>
            Il nostro team ha maturato una notevola esperienza nel settore dell'hardware e delle componenti informatiche per desktop, il PC Gaming è la nostra passione e
            vogliamo che diventi la passione di migliaia di altre persone.
          </p>
          <p>
            La scelta delle componenti non è una questione banale, una buona configurazione ha bisogno di equilibrio ed è per questo che valutiamo attentamente la qualità
            di tutte le componenti che compongono le nostre build.
          </p>
        </section>
        <BuildsWrapper />
      </Container>
      <Footer />
    </>
  );
}
