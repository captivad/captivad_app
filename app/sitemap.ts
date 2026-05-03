// import { router } from "@/utils/router";
// import axios from "axios";
// import { IBaseResponse, IResponsePagination } from "@/helpers/general.helper";
// import { Blog } from "@/prisma/prisma/client";

// export default async function sitemap() {
//   const bashUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   const allArticles = [];

//   try {
//     const response = await axios<IBaseResponse<IResponsePagination<Blog[]>>>({
//       url: `${bashUrl}/api/blog`,
//       method: "GET",
//       params: {},
//     });

//     if (response) {
//       const articles = response.data.payload?.rows.map((item) => {
//         return {
//           url: `${bashUrl}/blog/${item.title}`,
//           lastModified: new Date(),
//         };
//       });
//       if (articles) allArticles.push(...articles);
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   const allPage = router.map((item) => {
//     return {
//       url: `${bashUrl}${item.path}`,
//       lastModified: new Date(),
//     };
//   });
//   return [
//     {
//       url: `${bashUrl}/home`,
//       lastModified: new Date(),
//     },

//     ...allPage,
//     ...allArticles,
//   ];
// }

import type { MetadataRoute } from "next";
import { router } from "@/utils/router";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://captivad.co";

/**
 * Default change frequency untuk halaman statis.
 * Referensi: https://www.sitemaps.org/protocol.html#changefreqdef
 */
const DEFAULT_CHANGE_FREQ = "monthly" as const;
const BLOG_CHANGE_FREQ = "weekly" as const;

// ─────────────────────────────────────────────────────────────────────────────
// SANITY QUERY — ambil semua post yang sudah publish
// Hanya field yang diperlukan untuk sitemap: slug + tanggal terakhir diupdate.
// ─────────────────────────────────────────────────────────────────────────────

const SITEMAP_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && defined(publishedAt)
]{
  "slug": slug.current,
  "updatedAt": coalesce(_updatedAt, publishedAt),
  "publishedAt": publishedAt
}`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Bersihkan trailing slash dari URL agar tidak ada duplikasi.
 */
function cleanUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Map priority berdasarkan tipe halaman.
 * Homepage: 1.0 (tertinggi)
 * Blog list: 0.9
 * Blog detail: 0.8
 * Halaman statis lain: 0.7
 */
function getPagePriority(path: string): number {
  if (path === "/" || path === "/home") return 1.0;
  if (path === "/blog" || path === "/blog-v2") return 0.9;
  return 0.7;
}

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP ENTRIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Entri halaman statis dari router config.
 * changefreq "monthly" karena konten jarang berubah.
 */
function buildStaticEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: cleanUrl(BASE_URL, "/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const routerEntries: MetadataRoute.Sitemap = router.map((item) => ({
    url: cleanUrl(BASE_URL, item.path),
    lastModified: now,
    changeFrequency: DEFAULT_CHANGE_FREQ,
    priority: getPagePriority(item.path),
  }));

  return [homeEntry, ...routerEntries];
}

/**
 * Entri blog dari Sanity CMS (blog-v2).
 *
 * Menggunakan slug Sanity (bukan title) sebagai URL path:
 * - Slug di-encode dengan encodeURIComponent untuk keamanan
 * - lastModified diambil dari _updatedAt (bukan new Date()) agar
 *   search engine tahu kapan konten benar-benar berubah
 * - priority 0.8 — konten penting tapi di bawah halaman utama
 * - changeFrequency "weekly" — blog diupdate rutin
 *
 * Jika Sanity gagal (network error dll), sitemap tetap return
 * halaman statis tanpa crash (graceful degradation).
 */
async function buildBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await client.fetch<SanityDocument[]>(
      SITEMAP_POSTS_QUERY,
      {},
      {
        // Revalidate tiap 1 jam agar sitemap tidak terlalu stale
        // tanpa membebani Sanity API setiap request
        next: { revalidate: 3600 },
      }
    );

    if (!Array.isArray(posts) || posts.length === 0) return [];

    return posts.map((post) => ({
      // Gunakan slug bukan title untuk URL yang SEO-friendly dan stabil
      url: cleanUrl(BASE_URL, `/blog/${encodeURIComponent(post.slug)}`),
      // lastModified dari _updatedAt Sanity — lebih akurat dari new Date()
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: BLOG_CHANGE_FREQ,
      priority: 0.8,
    }));
  } catch (error) {
    // Log error tapi jangan crash — sitemap tetap valid tanpa blog entries
    console.error("[sitemap] Failed to fetch Sanity posts:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * sitemap()
 *
 * Menghasilkan sitemap XML otomatis untuk Next.js App Router.
 * Referensi: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Struktur prioritas:
 *   1.0  — Homepage
 *   0.9  — Blog list (/blog)
 *   0.8  — Blog detail (/blog/[slug])
 *   0.7  — Halaman statis lain (Who We Are, Services, dll)
 *
 * Catatan SEO:
 * - URL menggunakan slug bukan title agar canonical URL stabil meski judul berubah
 * - lastModified akurat dari CMS, bukan new Date() statis
 * - Tidak ada duplikasi URL (trailing slash dibersihkan)
 * - Blog entries di-fetch dari Sanity, bukan dari API internal yang bisa down
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticEntries, blogEntries] = await Promise.all([
    Promise.resolve(buildStaticEntries()),
    buildBlogEntries(),
  ]);

  return [...staticEntries, ...blogEntries];
}
