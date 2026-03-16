"use client";

import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const sections = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname === "/_not-found") return null;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {sections.map(({ label, id }) => (
          <button key={id} className={styles.link} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
