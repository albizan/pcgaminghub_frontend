import Head from "next/head";
import { useRouter } from "next/router";
import { http } from "../../utils/http";
import { createCartUrl } from "../../utils/amazon";
import { useEffect, useState } from "react";
import { CompleteBuild } from "../../interfaces/CompleteBuild.interface";
import Link from "next/link";
import BuildRow from "../../components/BuildRow";
import Footer from "../../components/Footer";

export default function BuildPage() {
  const router = useRouter();
  const { id } = router.query;

  const [completeBuild, setCompleteBuild] = useState<CompleteBuild>();

  // useRouter is a react hook, on compile time query is just an empty object and its content gets hydrated on the browser
  // I need to wait until query is defined, I can detect that with a useEffect
  useEffect(() => {
    async function getCompleteBuild() {
      try {
        const { data }: { data: CompleteBuild } = await http.get(`/build/${id}`);
        setCompleteBuild(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      getCompleteBuild();
    }
  }, [id]);

  if (!completeBuild) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <p className="text-center text-3xl tracking-wide">Caricamento in corso...</p>
      </div>
    );
  }

  if (completeBuild) {
    const total: number = completeBuild.items.reduce((total, item) => {
      const price = item.price || item.suggestedPrice;
      return total += price;
    }, 0);
    return (
      <>
        <Head>
          <title>La nostra configurazione</title>
          <meta name="description" content="Configurazione Computer Desktop" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="container mx-auto px-4 md:px-8">
          <Link href="/">
            <a className="mt-12 block text-indigo-500 text-sm md:text-lg font-thin tracking-tight">{"< "}Torna alla home</a>
          </Link>
          <header className="py-12 flex flex-col md:flex-row border-b border-gray-400">
            <div className="flex-1 back name date mb-8 md:mb-0">
              <h1 className="text-4xl lg:text-5xl font-thin">{completeBuild.name}</h1>
              <div>
                <p className="text-gray-600 text-xs sm:text-lg">Fascia di prezzo: {completeBuild.price} €</p>
                <p className="text-gray-600 text-xs sm:text-lg">Creazione configurazione: {completeBuild.date}</p>
              </div>
            </div>
            <div className="buttons flex text-gray-700 justify-center items-center">
              <div className="mr-4">
                <p className="font-black text-xs">Processore</p>
                <button className="focus:outline-none inline-block px-4 py-2 border rounded gradient text-white uppercase lg:text-xl w-24 lg:w-32">
                  {completeBuild.cpuBrand}
                </button>
              </div>

              {completeBuild.gpuBrand && (
                <div>
                  <p className="font-black text-xs">Scheda Video</p>
                  <button className="focus:outline-none inline-block px-4 py-2 border rounded gradient text-white uppercase lg:text-xl w-24 lg:w-32">
                    {completeBuild.gpuBrand}
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="flex lg:mt-16 text-xl md:text-2xl font-semibold text-gray-800">
            <p className="flex-1 text-left text-indigo-600">
              <a target="_blank" rel="noopener" href={createCartUrl(completeBuild, "wasabe-21")}>
                Aggiungi tutto al Carrello Amazon
              </a>
            </p>
            <p className="flex-1 text-right">Totale: {total.toFixed(2)} €</p>
          </div>

          {completeBuild.items.map((item) => (
            <BuildRow key={item.asin} component={item} />
          ))}
          <p className="text-xl text-indigo-600">* I prezzi in viola sono prezzi consigliati, vengono mostrati quando il il prodotto non è momentaneamente disponibile</p>

          <div className="text-gray-900 my-12 md:text-lg leading-relaxed">
            <h3 className="mb-4 inline-block text-3xl font-semibold border-b-4 border-indigo-500 leading-tight">Non sai assemblare?</h3>
            <p>
              Se hai problemi o non sai come assemblare un computer puoi rivolgerti a Luigi e Lorenzo di{" "}
              <a href="mailto: lltechconfigurazioni@gmail.com" className="text-indigo-500">
                LL-Tech
              </a>
            </p>
          </div>

          {completeBuild.description && (
            <div className="text-gray-900 my-12 md:text-lg leading-relaxed">
              <h3 className="mb-4 inline-block text-3xl font-semibold border-b-4 border-indigo-500 leading-tight">Descrizione</h3>
              <p>{completeBuild.description}</p>
            </div>
          )}

          <div className="text-gray-900 my-12 md:text-lg leading-relaxed">
            <h3 className="mb-4 inline-block text-3xl font-semibold border-b-4 border-indigo-500 leading-tight">Disclaimer</h3>
            <p>
              In qualità di affiliati Amazon, riceviamo una piccola percentuale su ogni acquisto effettuato tramite i link qui proposti. Questo non comporta nessun
              aumento di prezzo per l'acquirente finale
            </p>
            <p>
              Monitoriamo frequentemente tutti i prezzi dei prodotti qui mostrati, ciò nonostante vi esortiamo a controllare il prezzo direttamente sulla piattaforma
              Amazon.it prima di procedere con il completamento dell'ordine
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
