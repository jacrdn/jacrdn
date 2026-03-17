import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className={styles.main}>
      <Nav />
      <Link href="/blog" className={styles.back}>all posts</Link>

      <header className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.date}>{post.date}</p>
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        )}
        {post.skillFile && (
          <a
            href={`/${post.skillFile.replace(/^public\//, "")}`}
            download
            className={styles.downloadBtn}
          >
            download skill file
          </a>
        )}
      </header>

      <article
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
