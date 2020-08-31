import styles from "./styles.module.css";

export default function BuildCard({ baseBuild }) {
  console.info("CARD PROPS", baseBuild);
  const { id, name, price, date, cpuLabel, gpuLabel } = baseBuild;
  return (
    <div className="w-full md:w-1/2 md:px-1 lg:w-1/3 lg:px-2 my-6">
      <div className={`rounded-lg p-10 bg-indigo-400 text-white ${styles.lift} ${styles.cardBackground}`}>
        <div className="header flex">
          <div className="image w-24 h-24 rounded-lg overflow-hidden border-4 border-gray-200">
            <img className="object-cover w-full h-full" src="https://i.ytimg.com/vi/DDhmv2uX2Rs/maxresdefault.jpg" alt="small pic of pc" />
          </div>
          <div className="title price flex-1 ml-6 flex flex-col justify-center">
            <p className="text-xl lg:text-3xl">{name}</p>
            <div className="flex h-auto">
              <span className="item-start font-thin text-lg mr-1 text-gray-200">€</span>
              <span className="text-lg lg:text-2xl">{price}</span>
            </div>
          </div>
        </div>
        <div className="overview mt-12 tracking-wide font-semibold">
          <p className="mb-8">Configurazione da gaming leggero</p>
          <div className="cpu flex flex-row items-center py-4">
            <div className="w-10 border-2 rounded-lg p-2">
              <img src="/cpu.svg" alt="CPU Logo" className="logo" />
            </div>
            <div className="ml-6">
              <p className="text-sm text-gray-200">{cpuLabel}</p>
            </div>
          </div>
          <div className="gpu flex flex-row items-center py-4">
            <div className="w-10 border-2 rounded-lg p-2">
              <img src="/gpu.svg" alt="GPU Logo" className="logo" />
            </div>
            <div className="ml-6">
              <p className="text-sm text-gray-200">{gpuLabel}</p>
            </div>
          </div>
        </div>

        <div className="show-more-btn flex justify-center mt-12">
          <button className={`${styles.lift} inline-block focus:outline-none bg-white px-8 py-3 uppercase font-semibold text-indigo-500 rounded-full`}>
            Mostra Tutto {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
