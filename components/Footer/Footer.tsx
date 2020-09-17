import { IconContext } from "react-icons";
import { FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <section className="mt-32">
      <div className="gradient py-20 flex flex-col items-center justify-center">
        <p className="text-white text-lg md:text-xl">&copy; {new Date().getFullYear()} pcgaming.it - All right reserved </p>
        <IconContext.Provider value={{ color: "white", size: "2.4rem" }}>
          <div className="icons flex justify-center mt-4">
            <a target="_blank" href="https://t.me/pcbuildingitaly">
              <FaTelegram />
            </a>
          </div>
        </IconContext.Provider>
      </div>
    </section>
  );
}
