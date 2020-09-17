import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import BuildCard from "../BuildCard";
import { BaseBuild } from "../../interfaces/BaseBuild.interface";

const AMD = "AMD";
const INTEL = "INTEL";
const NVIDIA = "NVIDIA";

export default function BuildsWrapper() {
  let [baseBuilds, setBaseBuilds] = useState<BaseBuild[]>([]);
  let [filteredBuilds, setFilteredBuilds] = useState<BaseBuild[]>([]);
  let [cpus, setCpus] = useState([AMD, INTEL]);
  let [gpus, setGpus] = useState([AMD, NVIDIA]);
  let [minPrice, setMinPrice] = useState(600);
  let [maxPrice, setMaxPrice] = useState(2500);

  function toggleCPUAMD() {
    if (cpus.includes(INTEL)) {
      if (cpus.includes(AMD)) {
        setCpus(cpus.filter((cpu) => cpu !== AMD));
        return;
      }
      setCpus([...cpus, AMD]);
    }
  }

  function toggleCPUIntel() {
    if (cpus.includes(AMD)) {
      if (cpus.includes(INTEL)) {
        setCpus(cpus.filter((cpu) => cpu !== INTEL));
        return;
      }
      setCpus([...cpus, INTEL]);
    }
  }

  function toggleGPUAMD() {
    if (gpus.includes(NVIDIA)) {
      if (gpus.includes(AMD)) {
        setGpus(gpus.filter((gpu) => gpu !== AMD));
        return;
      }
      setGpus([...gpus, AMD]);
    }
  }

  function toggleGPUNvidia() {
    if (gpus.includes(AMD)) {
      if (gpus.includes(NVIDIA)) {
        setGpus(gpus.filter((gpu) => gpu !== NVIDIA));
        return;
      }
      setGpus([...gpus, NVIDIA]);
    }
  }

  // Retrieve al base builds from server on component mounting
  useEffect(() => {
    async function retrieveBaseBuilds() {
      try {
        const { data } = await http.get("/build/base");
        setBaseBuilds(data);
        setFilteredBuilds(data);
      } catch (error) {
        return;
      }
    }
    retrieveBaseBuilds();
  }, []);

  // Apply filter when CPU, GPU, price is changed by user
  useEffect(() => {
    const newFilteredBuilds = baseBuilds.filter((build) => {
      return cpus.includes(build.cpuBrand) && gpus.includes(build.gpuBrand) && minPrice <= build.price && build.price <= maxPrice;
    });
    setFilteredBuilds(newFilteredBuilds);
  }, [cpus, gpus, maxPrice, minPrice]);

  return (
    <div>
      <section className="text-sm md:text-lg">
        <h3 className="mt-12 mb-4 inline-block text-3xl font-semibold border-b-4 border-indigo-500 leading-tight">Le nostre configurazioni</h3>
        <p>
          Qui sotto troverai tutte le nostre configurazioni, abbiamo deciso di non pubblicare nessuna build al di sotto dei 600€ in quanto riteniamo questa soglia il
          minimo sindacale per un buon computer da gaming.
        </p>
        <p>
          Potrai trovare sicuramente la configurazione adatta a te, per agevolarti nell'impresa puoi filtrare le build in base ai tuoi brand preferiti e alla fascia di
          prezzo individuata.
        </p>
        <p>Inizialmente tutti i brand sono selezionati e attivi, clicca sul pulsante per rimuove il brand che non ti interessa, buona ricerca!</p>
      </section>
      <div className="mt-12 bg-white shadow-xl mb-20 py-12 px-4 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:flex-1">
            <p className="font-bold text-sm lg:text-lg text-center tracking-wide mb-4">Seleziona il brand del processore</p>
            <div className="flex justify-center">
              <button
                onClick={toggleCPUAMD}
                className={`${
                  cpus.includes(AMD) && styles.active
                } px-6 py-2 rounded border-2 border-indigo-600 text-indigo-600 font-semibold text-gray-600 w-32 uppercase focus:outline-none`}
              >
                AMD
              </button>
              <button
                onClick={toggleCPUIntel}
                className={`${
                  cpus.includes(INTEL) && styles.active
                } px-6 py-2 rounded border-2 border-indigo-600 text-indigo-600 font-semibold text-gray-600 w-32 uppercase focus:outline-none ml-6`}
              >
                INTEL
              </button>
            </div>
          </div>
          <div className="w-full mt-10 lg:mt-0 lg:flex-1">
            <p className="font-bold text-sm lg:text-lg text-center tracking-wide mb-4">Seleziona il brand della scheda video</p>
            <div className="flex justify-center">
              <button
                onClick={toggleGPUAMD}
                className={`${
                  gpus.includes(AMD) && styles.active
                } px-6 py-2 rounded border-2 border-indigo-600 text-indigo-600 font-semibold text-gray-600 w-32 uppercase focus:outline-none`}
              >
                AMD
              </button>
              <button
                onClick={toggleGPUNvidia}
                className={`${
                  gpus.includes(NVIDIA) && styles.active
                } px-6 py-2 rounded border-2 border-indigo-600 text-indigo-600 font-semibold text-gray-600 w-32 uppercase focus:outline-none ml-6`}
              >
                NVIDIA
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-around w-full mt-12 lg:mt-20">
          <div className="flex flex-col">
            <span className="font-semibold mr-2">Prezzo minimo</span>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value || "0"))}
              type="number"
              step="50"
              min="600"
              className={`block px-4 py-3 rounded border border-gray-300 focus:outline-none ${styles.input}`}
            />
          </div>

          <div className="flex flex-col mt-10 lg:mt-0">
            <span className="font-semibold mr-2">Prezzo massimo</span>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value || "0"))}
              type="number"
              step="50"
              min="650"
              className={`px-4 py-3 rounded border border-gray-300 focus:outline-none ${styles.input}`}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm md:text-lg">
          Per qualunque dubbio, curiosità o semplicemente perchè ti piace parlare di componenti hardware sappi che sei benvenuto nel gruppo telegram{" "}
          <a className="text-normal md:text-xl text-indigo-500 font-black border-b-2 border-indigo-500" href="https://t.me/pcbuildingitaly" target="_blank">
            PC Building Italia
          </a>
        </p>
      </div>
      <div id="builds" className="flex flex-wrap">
        {filteredBuilds.map((baseBuild) => (
          <BuildCard key={baseBuild.id} baseBuild={baseBuild} />
        ))}
      </div>
    </div>
  );
}
