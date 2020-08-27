import classNames from "classnames";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import Container from "../../layouts/Container";

export default function FullpageLanding() {
  return (
    <div className={classNames(styles.background, "h-screen w-full relative bg-red-400")}>
      <Container>
        <Navbar landing={true} />
      </Container>

      <div className="text-white text-4xl">Hello</div>
    </div>
  );
}
