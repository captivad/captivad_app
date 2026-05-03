import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogIndexClient, { Post } from "./blog-index-client";

// ─────────────────────────────────────────────────────────────────────────────
// QUERIES
// ─────────────────────────────────────────────────────────────────────────────

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && defined(publishedAt)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  category,
  "author": author->name,
  "imageUrl": image.asset->url
}`;

const options = { next: { revalidate: 60 } };

// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — fetch once, delegate UI to client
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return <BlogIndexClient posts={posts as Post[]} />;
}
