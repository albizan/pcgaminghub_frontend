import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import BuildCard from "../BuildCard";

const AMD = "AMD";
const INTEL = "Intel";
const NVIDIA = "Nvidia";

export default function BuildsWrapper() {
  let [baseBuilds, setBaseBuilds] = useState([]);
  let [filteredBuilds, setFilteredBuilds] = useState([]);
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

  return (
    <div>
      <div className="mt-12 bg-white shadow-xl mb-20 py-12 lg:px-20 py-8">
        <div className="flex">
          <div className="flex-1">
            <p className="font-bold text-lg text-center tracking-wide mb-4">Seleziona o deseleziona il brand del processore</p>
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
          <div className="flex-1">
            <p className="font-bold text-lg text-right text-center tracking-wide mb-4">Seleziona o deseleziona il brand della scheda video</p>
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

        <div className="flex justify-around w-full mt-20">
          <div className="flex flex-col">
            <span className="font-semibold mr-2">Prezzo minimo</span>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              type="number"
              className={`px-4 py-3 rounded border border-gray-300 focus:outline-none ${styles.input}`}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold mr-2">Prezzo massimo</span>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              type="number"
              className={`px-4 py-3 rounded border border-gray-300 focus:outline-none ${styles.input}`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredBuilds.map((baseBuild) => (
          <BuildCard key={baseBuild.id} baseBuild={baseBuild} />
        ))}
      </div>
    </div>
  );
}
