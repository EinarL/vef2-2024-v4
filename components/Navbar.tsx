
import Link from 'next/link';
import styles from "../public/styles/navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link className={styles.link} href="/">Forsíða</Link>
        </li>
        <li>
          <Link className={styles.link} href="/matches">Leikir</Link>
        </li>
      </ul>
    </nav>
  );
};