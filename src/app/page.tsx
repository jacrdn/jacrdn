import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import Section from "@/components/Section/Section";
import WorkCarousel from "@/components/WorkCarousel/WorkCarousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />

      <Section id="about" scrollAnimate>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={`gsap-hidden ${styles.bodyText}`}>
              Hey, my name is Jack Cardin. I&apos;m a 24-year-old Software Engineer, Product Designer, and Sound Designer based out of New England, USA. I&apos;m deeply passionate about user experience, design, and safety tailored for the underprivileged and overlooked. I believe in healthcare, security, and agency no matter a person&apos;s ability or economic status. I plan to use bleeding-edge technology to make the world a <span className={styles.slightly}>slightly</span> <span style={{ fontFamily: "var(--font-sub)" }}>better</span> place.
            </p>
            <p className={`gsap-hidden ${styles.bodyText}`} style={{ marginTop: "1.2rem" }}>
              Likes: agentic engineering, grilling, walks on the beach, Sudoku, and the music of Sade Adu, Lucki, Veeze, Vallée808, and Abztract.
            </p>
            <p className={`gsap-hidden ${styles.bodyText}`} style={{ marginTop: "1.2rem" }}>
              I also host <a href="https://podcasts.apple.com/om/podcast/artificial-idiots-ai/id1824447200" target="_blank" rel="noopener noreferrer" className={styles.link}>Artificial Idiots</a>, a podcast about the rapid changes in agentic AI.
            </p>
          </div>
          <Image
            src="/jack-cardin.png"
            alt="Jack Cardin"
            width={0}
            height={0}
            sizes="50vw"
            className={`gsap-hidden ${styles.aboutImage}`}
            priority
          />
        </div>
      </Section>

      <Section id="work">
        <h2 className={styles.sectionTitle}>Work</h2>
        <WorkCarousel />
      </Section>

      <Section id="contact" scrollAnimate>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.contactLinks}>
          <span>instagram: <a href="https://instagram.com/jacrdn" target="_blank" rel="noopener noreferrer">instagram.com/jacrdn</a></span>
          <span>linkedin: <a href="https://www.linkedin.com/in/jackrcardin/" target="_blank" rel="noopener noreferrer">linkedin.com/in/jackrcardin/</a></span>
          <span>email: <a href="mailto:jackrcardin@gmail.com">jackrcardin@gmail.com</a></span>
          <a href="/nowhere" className={styles.pigeon}>(via carrier pigeon, or MCP)</a>
        </div>
      </Section>
    </main>
  );
}
