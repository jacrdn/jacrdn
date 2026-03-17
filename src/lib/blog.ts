// SERVER ONLY — do not import from client components
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags: string[];
  skillFile?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title as string,
        date: data.date as string,
        slug: data.slug as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        skillFile: data.skillFile as string | undefined,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post {
  const filename = fs
    .readdirSync(POSTS_DIR)
    .find((f) => f.endsWith(".md") && f.includes(slug));
  if (!filename) throw new Error(`Post not found: ${slug}`);
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = marked.parse(content, { async: false }) as string;
  return {
    title: data.title as string,
    date: data.date as string,
    slug: data.slug as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    skillFile: data.skillFile as string | undefined,
    contentHtml,
  };
}
