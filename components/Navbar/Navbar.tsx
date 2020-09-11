import classNames from "classnames";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Navbar({ landing }) {
  let [isOpen, setIsOpen] = useState(false);

  function toggleNav() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="flex flex-wrap text-gray-700 lg:py-4">
      <div className="flex-1 flex justify-between items-center">
        <a href="#" className={classNames({ "text-white": landing, "text-indigo-600": !landing }, "text-2xl font-semibold tracking-tight")}>
          PC Gaming Hub
        </a>
        <span onClick={toggleNav} className="cursor-pointer lg:hidden block">
          <svg className="fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </span>
      </div>
      <div
        className={classNames({ hidden: !isOpen, block: isOpen, "text-white": landing, "text-indigo-600": !landing }, "lg:flex lg:items-center lg:w-auto w-full")}
        id="menu"
      >
        <nav className="text-right text-lg lg:text-left">
          <ul className="lg:flex items-center justify-between lg:pt-0">
            <li>
              <a
                className={classNames({ "hover:border-white": landing, "hover:border-indigo-600": !landing }, "inline-block border-b-2 border-transparent lg:ml-6")}
                href="#"
              >
                Chi Siamo
              </a>
            </li>
            <li>
              <a
                className={classNames({ "hover:border-white": landing, "hover:border-indigo-600": !landing }, "inline-block border-b-2 border-transparent lg:ml-6")}
                href="#"
              >
                Contatti
              </a>
            </li>
            <li>
              <a
                className={classNames({ "hover:border-white": landing, "hover:border-indigo-600": !landing }, "inline-block border-b-2 border-transparent lg:ml-6")}
                href="#"
              >
                Offerte
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
