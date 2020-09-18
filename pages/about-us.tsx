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
        <section>
          <div className="flex justify-center">
            <h1 className="mt-12 mb-4 inline-block text-5xl border-b-4 border-indigo-500 leading-tight text-center">Chi Siamo</h1>
          </div>
          <p className="text-gray-700 text-center md:text-xl">
            PC Gaming Hub nasce dall’idea di voler rendere semplice e alla portata di tutti l’assemblaggio di un computer.
          </p>

          <div className="flex justify-center">
            <div style={{ height: "1px" }} className="w-2/3 my-16 md:my-32 bg-gray-400"></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <h3 className="md:border-l-2 md:pl-10 border-black md:w-80 mb-12 md:mb-0 text-center md:text-left text-black text-3xl leading-none tracking-tight">
                <div className="text-5xl leading-none m-0 p-0 hidden md:block">"</div>Un pc deve adattarsi al suo possessore, non il contrario
              </h3>
            </div>
            <div className="flex-1 text-gray-700 text-base text-justify">
              <p>
                Sappiamo che in molti vorrebbero avvicinarsi al mondo del custom building, ma che per paura o inesperienza optano per un PC già assemblato in negozio
                piuttosto che costruirne uno da sé.
              </p>
              <p className="mt-4">
                La maggior parte delle persone vorrebbe un computer in grado di svolgere una precisa mansione, ma non sa quali siano le parti hardware necessarie per
                svolgere il compito e per evitare di fare un acquisto sbagliato sceglie di affidarsi alle configurazioni preconfezionate dei negozi. Questo sito ha
                l’obiettivo di rompere la barriera che separa l’utente dalla scelta giusta dei componenti.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div style={{ height: "1px" }} className="w-2/3 my-16 md:my-32 bg-gray-400"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
              <div className="w-full border border-gray-300 rounded h-full flex flex-col items-center justify-center py-8 bg-white shadow-xl lift">
                <img src="https://placekitten.com/360/360" alt="Avatar of admin" className="mb-6 rounded-full h-24 w-24" />
                <div className="px-4 text-center">
                  <p className="text-gray-700">Founder/CEO</p>
                  <p className="text-gray-900 text-3xl mb-4">Blackrabbit</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
              <div className="w-full border border-gray-300 rounded h-full flex flex-col items-center justify-center py-8 bg-white shadow-xl lift">
                <img src="/aw.jpg" alt="Avatar of admin" className="mb-6 rounded-full h-24 w-24" />
                <div className="px-4 text-center">
                  <p className="text-gray-700">Founder/Developer</p>
                  <p className="text-gray-900 text-3xl mb-4">Angry Weasel</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
              <div className="w-full border border-gray-300 rounded h-full flex flex-col items-center justify-center py-8 bg-white shadow-xl lift">
                <img src="/c.jpg" alt="Avatar of admin" className="mb-6 rounded-full h-24 w-24" />
                <div className="px-4 text-center">
                  <p className="text-gray-700">Project Manager</p>
                  <p className="text-gray-900 text-3xl mb-4">Cesco 2161</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}
