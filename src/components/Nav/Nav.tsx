"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const sections = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact", hideMobile: true },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname === "/_not-found") return null;

  const isHomepage = pathname === "/";

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className={isHomepage ? styles.headerInline : styles.headerFixed}>
      <nav className={styles.nav}>
        {isHomepage
          ? sections.map(({ label, id, hideMobile }) => (
              <button key={id} className={`${styles.link}${hideMobile ? ` ${styles.hideMobile}` : ""}`} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))
          : <Link href="/blog" className={styles.link}>Blog</Link>
        }
      </nav>
    </header>
  );
}
