import Hero from "@/components/Hero/Hero";
import Section from "@/components/Section/Section";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />

      <Section id="about" scrollAnimate>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={`gsap-hidden ${styles.bodyText}`}>
          Placeholder — tell your story here.
        </p>
      </Section>

      <Section id="work" scrollAnimate>
        <h2 className={styles.sectionTitle}>Work</h2>
        <div className={`gsap-hidden ${styles.grid}`}>
          {["Project A", "Project B", "Project C"].map((p) => (
            <div key={p} className={styles.card}>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" scrollAnimate>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={`gsap-hidden ${styles.bodyText}`}>
          Placeholder — contact info here.
        </p>
      </Section>
    </main>
  );
}
