"use client";

import { useRef } from "react";
import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

function ScanLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`w-full h-px bg-white/10 relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[28%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.3, ease: "easeInOut", delay }}
      />
    </div>
  );
}

function NodeGrid({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTABLE TEXT COMPONENTS — styled untuk dark theme
// ─────────────────────────────────────────────────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-5">{children}</p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-2xl md:text-3xl font-bold text-white/90 mt-10 mb-4 leading-tight">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl md:text-2xl font-bold text-white/85 mt-8 mb-3 leading-tight">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-bold text-white/80 mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-white/20 pl-5 my-6 text-white/40 italic text-sm leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="flex flex-col gap-2 mb-5 pl-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="flex flex-col gap-2 mb-5 pl-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-white/60 text-sm leading-relaxed flex gap-2">
        <span className="text-white/20 flex-shrink-0 mt-1">—</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-white/60 text-sm leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-white/90 font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="text-white/70 italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/70 underline underline-offset-2 hover:text-white transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR: Latest Posts
// ─────────────────────────────────────────────────────────────────────────────

function LatestPostSidebar({ posts, currentId }: { posts: SanityDocument[]; currentId: string }) {
  const filtered = posts.filter((p) => p._id !== currentId).slice(0, 4);

  return (
    <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 flex flex-col gap-5">
      <FadeUp delay={0.5}>
        <p className="text-lg text-white mb-1">
          Latest Blog
        </p>
        <ScanLine delay={0.6} />
      </FadeUp>

      <div className="flex flex-col gap-3">
        {filtered.map((post, i) => (
          <FadeUp key={post._id} delay={0.6 + i * 0.08}>
            <Link href={`/blog/${post.slug.current}`}
              className="group flex gap-3 items-start p-3 border border-white/[0.06] hover:border-white/20 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.015)" }}>
              {/* Thumbnail */}
              {post.imageUrl && (
                <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-white/[0.04]">
                  <img src={post.imageUrl} alt={post.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
              )}
              <div className="flex flex-col gap-1 min-w-0">
                {post.category && (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">
                    {post.category}
                  </span>
                )}
                <p className="text-xs text-white/60 group-hover:text-white/85 leading-snug transition-colors duration-200 line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface BlogDetailClientProps {
  post: SanityDocument;
  postImageUrl: string | null;
  latestPosts: SanityDocument[];
}

export default function BlogDetailClient({
  post,
  postImageUrl,
  latestPosts,
}: BlogDetailClientProps) {
  // Parallax hero image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative w-full bg-background min-h-screen overflow-hidden">
      <NodeGrid opacity={0.03} />

      {/* ── Hero image ── */}
      <div ref={heroRef} className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
        {postImageUrl ? (
          <>
            <motion.img
              src={postImageUrl}
              alt={post.title}
              style={{ y: heroImgY }}
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.95) 100%)",
              }} />
          </>
        ) : (
          <div className="w-full h-full bg-white/[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        )}

       
      </div>

      {/* ── Content wrapper ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[6%] xl:px-12 -mt-16 pb-24 flex flex-col gap-10">

        {/* ── Post header ── */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-4 max-w-[760px]">
            {/* Category */}
            {post.category && (
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                {post.category}
              </span>
            )}

             {/* Back button */}
            <motion.div style={{ opacity: heroOpacity }}>
                <Link href="/blog-v2"
                    className="rounded-full h-12 w-12 inline-flex items-center gap-2 text-sm text-white transition-colors duration-200 group border-2 border-white/50 hover:border-white px-3 py-2"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
                    <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-200 text-white" />
                </Link>
            </motion.div>

            {/* Title */}
            <h1 className="font-bold leading-tight text-white/95"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}>
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {[
                { icon: Tag, label: post.category },
                { icon: User, label: post.author ?? "CaptivAd" },
                { icon: Calendar, label: formatDate(post.publishedAt) },
              ].filter((m) => m.label).map((meta, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <meta.icon size={20} className="text-white" />
                  <span className="text-lg text-white">{meta.label}</span>
                </div>
              ))}
            </div>

            <ScanLine delay={0.3} className="mt-2" />
          </div>
        </FadeUp>

        {/* ── Main layout: body + sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Article body */}
          <FadeUp delay={0.3} className="flex-1 min-w-0">
            <article>
              {Array.isArray(post.body) && (
                <PortableText value={post.body} components={ptComponents} />
              )}
            </article>

            {/* Back link at bottom */}
            <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Link href="/blog-v2"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white transition-colors duration-200 group">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                All articles
              </Link>
            </div>
          </FadeUp>

          {/* Sidebar */}
          <LatestPostSidebar posts={latestPosts} currentId={post._id} />
        </div>
      </div>
    </div>
  );
}