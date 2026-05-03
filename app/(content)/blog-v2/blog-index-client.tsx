"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { type SanityDocument } from "next-sanity";
import FadeUp from "@/components/fade-up";
import SplitWords from "@/components/split-words";
import ScanLine from "@/components/scan-line";
import NodeGrid from "@/components/node-grid";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const POSTS_PER_PAGE = 6;

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Post extends SanityDocument {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  category?: string;
  author?: string;
  imageUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getUniqueCategories(posts: Post[]): string[] {
  const cats = posts.map((p) => p.category).filter(Boolean) as string[];
  return Array.from(new Set(cats));
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGHLIGHT CARD — card besar untuk 2 post teratas
// ─────────────────────────────────────────────────────────────────────────────

function HighlightCard({ post, index }: { post: Post; index: number }) {
  return (
    <FadeUp delay={index * 0.1}>
      <Link
        href={`/blog-v2/${post.slug.current}`}
        className="group block h-full"
      >
        <article
          className="relative overflow-hidden h-full min-h-[320px] flex flex-col justify-end rounded-xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111",
          }}
        >
          {/* Thumbnail */}
          {post.imageUrl ? (
            <div className="absolute inset-0">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.98) 10%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,0.15) 100%)",
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          )}

          {/* Category badge */}
          {/* {post.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/50 px-2 py-1 border border-white/10"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
                {post.category}
              </span>
            </div>
          )} */}

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col gap-2">
            <h2
              className="font-bold leading-snug text-white/90 group-hover:text-white transition-colors duration-200"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
            >
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-white/80">
                {post.author ?? "CaptivAd Team"}
              </span>
              <span className="text-white/15">·</span>
              <span className="text-sm text-white/80">
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </FadeUp>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SMALL CARD — untuk grid bawah
// ─────────────────────────────────────────────────────────────────────────────

function SmallCard({ post, index }: { post: Post; index: number }) {
  return (
    <FadeUp delay={index * 0.08}>
      <Link
        href={`/blog-v2/${post.slug.current}`}
        className="group block h-full"
      >
        <article
          className="flex flex-col overflow-hidden h-full rounded-xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#111",
          }}
        >
          {/* Thumbnail */}
          <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0 bg-white/[0.03]">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-600"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">
                  No image
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            <h3 className="font-bold text-sm leading-snug text-white/80 group-hover:text-white transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 mt-auto pt-2">
              <span className="text-sm text-white/80">
                {post.author ?? "CaptivAd Team"}
              </span>
              <span className="text-white/15">·</span>
              <span className="text-sm text-white/80">
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </FadeUp>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 justify-center pt-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-colors duration-200"
      >
        <ChevronLeft size={13} className="text-white/50" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-8 h-8 flex items-center justify-center text-[11px] font-mono border transition-colors duration-200"
          style={{
            borderColor:
              p === current ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
            background: p === current ? "rgba(255,255,255,1)" : "transparent",
            color: p === current ? "#000" : "rgba(255,255,255,0.4)",
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-colors duration-200"
      >
        <ChevronRight size={13} className="text-white/50" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogIndexClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Highlights");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => getUniqueCategories(posts), [posts]);
  const filterTabs = ["Highlights", "All", ...categories];

  // ── Filter + Search ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...posts];

    // Filter by tab
    if (activeFilter === "Highlights") {
      result = result.slice(0, Math.min(result.length, 12));
    } else if (activeFilter !== "All") {
      result = result.filter((p) => p.category === activeFilter);
    }

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, activeFilter, search]);

  // Reset to page 1 whenever filter/search changes
  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setPage(1);
  };
  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  // ── Pagination ───────────────────────────────────────────────────────────
  // Highlights mode: first 2 are big cards, rest are small
  const isHighlights = activeFilter === "Highlights" && !search.trim();
  const highlightPosts = isHighlights ? filtered.slice(0, 2) : [];
  const gridPosts = isHighlights ? filtered.slice(2) : filtered;

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const pagedGridPosts = gridPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="relative w-full bg-background min-h-screen pt-[5%] overflow-hidden">
      <NodeGrid opacity={0.04} />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 10%, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[6%] xl:px-12 pt-28 md:pt-36 pb-24 flex flex-col gap-10">
        {/* ── Hero header ── */}
        <div className="flex flex-col gap-2 max-w-[700px]">
          <h1 className="tracking-tight">
            <SplitWords text="Stay Ahead with" delay={0.25} stagger={0.08} />
            <br />
            <span className="">
              <SplitWords
                text="Digital Marketing & AI Updates"
                delay={0.6}
                stagger={0.07}
              />
            </span>
          </h1>

          <FadeUp delay={0.7}>
            <p className="text-white/50 leading-relaxed">
              Explore your potential with CaptivAd&apos;s mindful insights and
              inspiring stories on marketing, AI, and the future of brand
              engagement.
            </p>
          </FadeUp>
        </div>

        <ScanLine delay={0.9} />

        {/* ── Search + Filter row ── */}
        <FadeUp
          delay={0.4}
          className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter posts"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className="inline-flex rounded-full items-center gap-1.5 px-3.5 py-1.5 text-sm font-mono uppercase tracking-widest transition-all duration-200"
                style={{
                  border:
                    tab === activeFilter
                      ? "1px solid rgba(255,255,255,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                  background:
                    tab === activeFilter ? "#fff" : "rgba(255,255,255,0.02)",
                  color:
                    tab === activeFilter ? "#000" : "rgba(255,255,255,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {tab === activeFilter && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"
                    aria-hidden
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-64">
            <Search
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-8 pr-8 py-2 text-sm font-mono text-white/60 placeholder:text-white/20 bg-transparent border border-white/10 rounded-full outline-none focus:border-white/30 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.02)" }}
            />
            {search && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                <X size={11} />
              </button>
            )}
          </div>
        </FadeUp>

        {/* ── Empty state ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-20 text-center"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
                No articles found
              </span>
              <p className="text-white/30 text-sm">
                Try a different search term or filter.
              </p>
              <button
                onClick={() => {
                  handleSearch("");
                  handleFilterChange("All");
                }}
                className="text-[10px] rounded-full font-mono uppercase tracking-widest text-white/30 border border-white/10 px-4 py-2 hover:border-white/30 hover:text-white/60 transition-colors duration-200"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {filtered.length > 0 && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ── Highlights: 2 big cards ── */}
              {isHighlights && highlightPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {highlightPosts.map((post, i) => (
                    <HighlightCard
                      key={post._id}
                      post={post as Post}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* ── Grid: small cards (paginated) ── */}
              {pagedGridPosts.length > 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`page-${page}-${activeFilter}-${search}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {pagedGridPosts.map((post, i) => (
                      <SmallCard key={post._id} post={post as Post} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <FadeUp delay={0.2} className="mt-10">
                  <Pagination
                    current={page}
                    total={totalPages}
                    onChange={setPage}
                  />
                </FadeUp>
              )}

              {/* ── Result count ── */}
              <FadeUp delay={0.1} className="mt-6 text-center">
                <span className="text-sm font-mono text-white uppercase tracking-widest">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                  {search ? ` for "${search}"` : ""}
                </span>
              </FadeUp>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
