import styles from "./styles.module.css";

export default function MouseScroll() {
  return (
    <div className={styles.mouse}>
      <div className={styles.wheel}></div>
    </div>
  );
}
