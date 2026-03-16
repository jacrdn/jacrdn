import NotFoundClient from "@/components/NotFoundClient/NotFoundClient";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <NotFoundClient />
      <div className={styles.embed}>
        <iframe
          src="https://www.youtube.com/embed/xrkFsSgp6MI"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </main>
  );
}
