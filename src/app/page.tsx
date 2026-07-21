import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import Section from "@/components/Section/Section";
import WorkCarousel from "@/components/WorkCarousel/WorkCarousel";
import HeaderWord from "@/components/HeaderWord/HeaderWord";
import Nav from "@/components/Nav/Nav";
import BlogPreview from "@/components/BlogPreview/BlogPreview";
import { getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 4);
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <HeaderWord />
        <Nav />
      </div>
      <Hero />

      <Section id="about" scrollAnimate>
        <div className={styles.aboutLayout}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={`gsap-hidden ${styles.bodyText}`}>
              Hey, my name is Jack Cardin. I&apos;m a 24-year-old Software Engineer, Product Designer, and Sound Designer based out of New England, USA. I&apos;m deeply passionate about user experience, design, and safety tailored for the underprivileged and overlooked. I believe in healthcare, security, and agency no matter a person&apos;s ability or economic status. I plan to use bleeding-edge technology to make the world a <span className={styles.slightly}>slightly</span> <span style={{ fontFamily: "var(--font-sub)" }}>better</span> place.
            </p>
            <p className={styles.likesHeading}>Interests &amp; Passions</p>
            <ul className={`gsap-hidden ${styles.likesList}`}>
              <li>Agentic engineering, Grilling, The Beach, Sudoku, Sade</li>
              <li><a href="https://podcasts.apple.com/om/podcast/artificial-idiots-ai/id1824447200" target="_blank" rel="noopener noreferrer" className={styles.link}>The Artificial Idiots Podcast</a> — a podcast where fellow agentic entrepreneurs and power users share thoughts, comments, and concerns regarding agentic AI</li>
            </ul>
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

      <Section id="blog" scrollAnimate>
        <h2 className={styles.sectionTitle}>Blog</h2>
        <BlogPreview posts={recentPosts} />
      </Section>

      <Section id="contact" scrollAnimate>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.contactLinks}>
          <span>linkedin: <a href="https://www.linkedin.com/in/jackrcardin/" target="_blank" rel="noopener noreferrer">linkedin.com/in/jackrcardin/</a></span>
          <span>email: <a href="mailto:jackrcardin@gmail.com">jackrcardin@gmail.com</a></span>
          <a href="/nowhere" className={styles.pigeon}>(via carrier pigeon, or MCP)</a>
        </div>
      </Section>
    </main>
  );
}
