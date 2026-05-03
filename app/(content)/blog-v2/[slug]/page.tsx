import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogDetailClient from "./blog-detail-client";

// ─────────────────────────────────────────────────────────────────────────────
// QUERIES
// ─────────────────────────────────────────────────────────────────────────────

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  excerpt,
  "category": categories[0]->title,
  "author": author->name,
  "mainImage": image.asset->url
}`;

const LATEST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && defined(publishedAt)
]|order(publishedAt desc)[0...5]{
  _id,
  title,
  slug,
  publishedAt,
  "category": categories[0]->title,
  "imageUrl": image.asset->url
}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 60 } };

// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const [post, latestPosts] = await Promise.all([
    client.fetch<SanityDocument>(POST_QUERY, resolvedParams, options),
    client.fetch<SanityDocument[]>(LATEST_QUERY, {}, options),
  ]);

  if (!post) notFound();

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(675).url()
    : null ;

  return (
    <BlogDetailClient
      post={post}
      postImageUrl={postImageUrl as string | null}
      latestPosts={latestPosts}
    />
  );
}