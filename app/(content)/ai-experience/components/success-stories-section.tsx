"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SUCCESS_STORIES } from "../data";
import YoutubeModal from "./youtube-modal";
import GlowOrb from "@/components/glow-orb";
import NodeGrid from "@/components/node-grid";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";
import Image from "next/image";

/**
 * SuccessStoriesSection
 *
 * §3 — Grid 2 kartu campaign.
 * Setiap kartu menampilkan thumbnail YouTube, badge kategori,
 * judul, deskripsi, stats, dan tombol Play yang membuka YoutubeModal.
 */
export default function SuccessStoriesSection() {
  const [activeVideo, setActiveVideo] = useState<{
    youtubeId: string;
    startAt: number;
  } | null>(null);

  return (
    <section className="relative w-full bg-background border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
      <GlowOrb x="30%" y="60%" size="50%" opacity={0.03} />
      <NodeGrid opacity={0.03} />

      <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}>
            <SplitWords
              text="Our AI Xperience Success Stories"
              delay={0.1}
              stagger={0.07}
            />
          </h2>
          <FadeUp delay={0.2}>
            <p
              style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
              className="text-white leading-relaxed"
            >
              From ordinary to extraordinary: See how Indonesia&apos;s top
              brands are leveraging AI Xperience to build campaigns that define
              the future.
            </p>
          </FadeUp>
        </div>

        <ScanLine delay={0.3} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUCCESS_STORIES.map((s, i) => (
            <FadeUp
              key={s.brand}
              delay={i * 0.15}
              className="group relative overflow-hidden min-h-[600px] flex flex-col justify-end rounded-xl cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Thumbnail background */}
              <div className="absolute inset-0">
                <motion.img
                  src={s.thumbnail}
                  alt={s.brand}
                  className="w-full h-full object-cover opacity-25 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,8,0.98) 20%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.2) 100%)",
                  }}
                />
              </div>

              {/* Category badge */}
              <div
                className="absolute top-5 left-5 text-sm lg:text-lg font-semibold rounded-full  text-white px-2.5 py-1 border border-white"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {s.category}
              </div>

              {/* Play button — centered, visible on hover */}
              <button
                onClick={() =>
                  setActiveVideo({ youtubeId: s.youtubeId, startAt: s.startAt })
                }
                className="absolute inset-0 -top-44 flex items-center justify-center z-20 group/play"
                aria-label={`Play ${s.brand}`}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover/play:border-white group-hover/play:bg-white/10"
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                    // Sembunyikan saat tidak hover card, tampilkan saat hover
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play size={22} className="text-white ml-1" fill="white" />
                </motion.div>
              </button>

              {/* Content */}
              <div className="relative z-10 px-7 flex flex-col gap-4">
                <div className="flex flex-col">
                  <Image
                    src={s.logoBrand}
                    alt={s.brand}
                    className="object-contain"
                    style={{
                      filter: "grayscale() contrast(0.5) brightness(2)",
                    }}
                    width={100}
                    height={50}
                  />

                  <h3
                    className="font-bold uppercase tracking-tight text-white/90"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
                  >
                    {s.brand}
                  </h3>
                </div>
                <p
                  style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
                  className="text-white/40 leading-relaxed"
                >
                  {s.desc}
                </p>

                {/* Stats */}
                <div className="flex gap-6 md:p-7 pt-7 justify-between border-t border-white/[0.07] mt-2">
                  {s.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <span
                        style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}
                        className="font-mono font-bold text-white"
                      >
                        {stat.value}
                      </span>
                      <span className="text-sm lg:text-base capitalize text-white/50">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* YouTube Modal */}
      <YoutubeModal
        youtubeId={activeVideo?.youtubeId ?? null}
        startAt={activeVideo?.startAt}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
