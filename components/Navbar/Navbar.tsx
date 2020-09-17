import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ landing }) {
  let [isOpen, setIsOpen] = useState(false);

  function toggleNav() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="flex flex-wrap text-gray-700 py-4 lg:py-8 select-none">
      <div className="flex-1 flex justify-between items-center">
        <a href="#" className={classNames({ "text-white": landing, "text-gray-900": !landing }, "text-2xl font-semibold tracking-tight")}>
          PC Gaming Hub
        </a>
        <span onClick={toggleNav} className="cursor-pointer lg:hidden block">
          <svg
            className={classNames({ "text-white": landing, "text-gray-900": !landing }, "fill-current")}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </span>
      </div>
      <div
        className={classNames({ hidden: !isOpen, block: isOpen, "text-white": landing, "text-gray-900": !landing }, "lg:flex lg:items-center lg:w-auto w-full")}
        id="menu"
      >
        <nav className="text-right text-lg lg:text-xl lg:text-left">
          <ul className="lg:flex items-center justify-between lg:pt-0">
            <li className={classNames({ "border-white": landing, "border-gray-700": !landing }, "border-2 p-3 rounded-lg lg:border-0 lg:p-0 my-3 lg:my-0")}>
              <Link href="/about-us">
                <a
                  className={classNames(
                    { "hover:border-white": landing, "hover:border-gray-900": !landing },
                    "lg:mt-0 inline-block border-b-2 border-transparent lg:ml-6",
                  )}
                >
                  Chi Siamo
                </a>
              </Link>
            </li>
            <li className={classNames({ "border-white": landing, "border-gray-700": !landing }, "border-2 p-3 rounded-lg lg:border-0 lg:p-0 my-3 lg:my-0")}>
              <a
                className={classNames({ "hover:border-white": landing, "hover:border-gray-900": !landing }, "inline-block border-b-2 border-transparent lg:ml-6")}
                href="https://t.me/offertecomponenti"
              >
                Offerte
              </a>
            </li>
            <li className="lg:border-0 lg:p-0 my-3 lg:my-0">
              <a
                className={classNames(
                  {
                    "hover:border-white": landing,
                    "hover:border-gray-900": !landing,
                    "bg-gray-100": landing,
                    gradient: !landing,
                    "text-gray-900": landing,
                    "text-white": !landing,
                  },
                  "inline-block lg:ml-6 rounded-lg px-3 py-2",
                )}
                target="_blank"
                href="https://t.me/pcbuildingitaly"
              >
                Telegram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
