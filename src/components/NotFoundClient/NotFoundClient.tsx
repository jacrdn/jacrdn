"use client";

import Link from "next/link";
import styles from "./NotFoundClient.module.css";

export default function NotFoundClient() {
  return (
    <Link href="/" className={styles.back}>
      back home
    </Link>
  );
}
