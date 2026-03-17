import Link from "next/link";
import Nav from "@/components/Nav/Nav";
import { getAllPosts } from "@/lib/blog";
import styles from "./page.module.css";

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className={styles.main}>
      <Nav />
      <Link href="/" className={styles.back}>back</Link>
      <h1 className={styles.heading}>Blog</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/blog/${post.slug}`} className={styles.itemLink}>
              <div className={styles.itemRow}>
                <span className={styles.itemTitle}>{post.title}</span>
                <span className={styles.itemDate}>{post.date}</span>
              </div>
              <p className={styles.itemExcerpt}>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
