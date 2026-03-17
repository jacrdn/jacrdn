import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import styles from "./BlogPreview.module.css";

interface Props {
  posts: PostMeta[];
}

export default function BlogPreview({ posts }: Props) {
  const [featured, ...rest] = posts;

  return (
    <div className={styles.root}>
      {featured && (
        <div className={`gsap-hidden ${styles.featured}`}>
          <p className={styles.featuredDate}>{featured.date}</p>
          <h3 className={styles.featuredTitle}>
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h3>
          <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
          <Link href={`/blog/${featured.slug}`} className={styles.readLink}>
            read
          </Link>
        </div>
      )}

      {rest.length > 0 && (
        <ul className={`gsap-hidden ${styles.moreList}`}>
          {rest.map((post) => (
            <li key={post.slug} className={styles.moreItem}>
              <Link href={`/blog/${post.slug}`} className={styles.moreLink}>
                {post.title}
              </Link>
              <span className={styles.moreDate}>{post.date}</span>
            </li>
          ))}
        </ul>
      )}

      <Link href="/blog" className={`gsap-hidden ${styles.seeAll}`}>
        see all posts
      </Link>
    </div>
  );
}
