import classNames from "classnames";
import styles from "./styles.module.css";

import Container from "../../layouts/Container";

import Navbar from "../Navbar";
import MouseScroll from "../MouseScroll";

export default function FullpageLanding() {
  return (
    <div className={classNames(styles.background, "h-screen w-full relative bg-red-400")}>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="mt-12 p-8 text-white text-xl font-thin tracking-wide border-white">
          <h1>
            Benvenuto su <span className="block text-5xl font-bold tracking-wide">PC Gaming Hub</span>
          </h1>
          <h2>Scegliamo per te le migliori configurazioni per ogni fascia di prezzo</h2>
          <div>
            <button className="mt-12 border-2 rounded px-5 py-3 uppercase font-semibold tracking-wide border-white hover:bg-white hover:text-indigo-600 focus:outline-none">
              Mostra Altro
            </button>
          </div>
        </div>
        <div className="absolute top-0 w-full">
          <Container>
            <Navbar landing={true} />
          </Container>
        </div>
        <div className="absolute bottom-0 w-full flex justify-center pb-20">
          <MouseScroll />
        </div>
      </div>
    </div>
  );
}