import styles from "./styles.module.css";

export default function BuildCard() {
  return (
    <div className="w-full md:w-1/2 md:px-1 lg:w-1/3 lg:px-2 my-6">
      <div className={`rounded-lg p-12 bg-indigo-400 text-white ${styles.cardBackground}`}>
        <div className="header flex">
          <div className="image w-24 h-24 rounded-lg overflow-hidden border-4 border-white">
            <img src="https://picsum.photos/140" alt="small pic of pc" />
          </div>
          <div className="title price flex-1 ml-6 flex flex-col justify-center">
            <p className="text-4xl font-semibold">Prova 01</p>
            <div className="flex h-auto">
              <span className="item-start font-thin text-lg mr-1 text-gray-200">€</span>
              <span className="item-end text-3xl">630</span>
            </div>
          </div>
        </div>
        <div className="overview mt-12 tracking-wide font-semibold">
          <p className="mb-8 text-lg">Configurazione da gaming leggero</p>
          <div className="cpu flex flex-row items-center py-4">
            <div className="w-12 border-2 rounded-lg p-2">
              <img src="/cpu.svg" alt="CPU Logo" className="logo" />
            </div>
            <div className="ml-6">
              <p className="text-gray-200">Intel 9400f</p>
            </div>
          </div>
          <div className="gpu flex flex-row items-center py-4">
            <div className="w-12 border-2 rounded-lg p-2">
              <img src="/gpu.svg" alt="GPU Logo" className="logo" />
            </div>
            <div className="ml-6">
              <p className="text-gray-200">Nvidia 1660super</p>
            </div>
          </div>
        </div>

        <div className="show-more-btn flex justify-center mt-12">
          <button className={`${styles.lift} focus:outline-none w-full bg-white px-5 py-3 uppercase font-black text-indigo-500 text-xl rounded-lg`}>
            Mostra Tutto {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
