import { useRouter } from "next/router";

import { http } from "../../utils/http";
import { useEffect, useState } from "react";
import { CompleteBuild } from "../../interfaces/CompleteBuild.interface";
import Link from "next/link";
import BuildRow from "../../components/BuildRow";

export default function BuildPage() {
  const router = useRouter();
  const { id } = router.query;

  const [completeBuild, setCompleteBuild] = useState<CompleteBuild>();

  // useRouter is a react hook, on compile time query is just an empty object and its content gets hydrated on the browser
  // I need to wait until query is defined, I can detect that with a useEffect
  useEffect(() => {
    async function getCompleteBuild() {
      try {
        const { data } = await http.get(`/build/${id}`);
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
    const total: number = completeBuild.items.reduce((total, item) => (total += item.price), 0);
    return (
      <section className="container mx-auto px-4">
        <header className="py-12 flex items-center border-b border-gray-400">
          <div className="flex-1 back name date">
            <Link href="/">
              <a className="text-indigo-500 text-sm md:text-lg font-thin tracking-tight">{"< "}Torna alla home</a>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-thin mt-10">{completeBuild.name}</h1>
            <div>
              <p className="text-gray-500 text-xs md:text-lg">Fascia di prezzo: {completeBuild.price} €</p>
              <p className="text-gray-500 text-xs md:text-lg">Creazione configurazione: {completeBuild.date}</p>
              <p className="hidden md:block text-gray-500 text-xs md:text-lg">{id}</p>
            </div>
          </div>
          <div className="buttons flex flex-col md:flex-row text-gray-700 ">
            <div className="mr-4">
              <p className="font-black text-xs">Processore</p>
              <button className="focus:outline-none inline-block px-6 py-2 border rounded gradient text-white uppercase lg:text-2xl w-24 lg:w-32">
                {completeBuild.cpuBrand}
              </button>
            </div>

            {completeBuild.gpuBrand && (
              <div>
                <p className="font-black text-xs">Scheda Video</p>
                <button className="focus:outline-none inline-block px-6 py-2 border rounded gradient text-white uppercase lg:text-2xl w-24 lg:w-32">
                  {completeBuild.gpuBrand}
                </button>
              </div>
            )}
          </div>
        </header>

        <p className="mt-10 lg:mt-16 text-center md:text-right text-xl lg:text-2xl font-semibold text-gray-700">Totale: {total.toFixed(2)} €</p>
        {completeBuild.items.map((item) => (
          <BuildRow key={item.asin} component={item} />
        ))}

        <div className="text-gray-700 my-12">
          <h3 className="text-3xl font-thin">Disclaimer</h3>
          <p>
            In qualità di affiliati Amazon, riceviamo una piccola percentuale su ogni acquisto effettuato tramite i link qui proposti. Questo non comporta nessun aumento
            di prezzo per l'acquirente finale
          </p>
          <p>
            Monitoriamo frequentemente tutti i prezzi dei prodotti qui mostrati, ciò nonostante vi esortiamo a controllare il prezzo direttamente sulla piattaforma
            Amazon.it prima di procedere con il completamento dell'ordine
          </p>
        </div>
      </section>
    );
  }
}
