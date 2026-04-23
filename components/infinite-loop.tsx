"use client";

import React, { useRef, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Struktur data setiap brand partner */
interface Brand {
  /** Nama brand, digunakan sebagai alt text dan key */
  name: string;
  /** Path atau URL logo brand (SVG / PNG / WebP direkomendasikan) */
  logo: string;
}

/** Props komponen InfiniteMarquee */
interface InfiniteMarqueeProps {
  /** Daftar brand yang akan ditampilkan */
  brands: Brand[];
  /**
   * Durasi satu siklus penuh animasi (dalam detik).
   * Semakin kecil = semakin cepat. Default: 30
   */
  duration?: number;
  /**
   * Lebar logo yang seragam (px). Semua logo akan di-constrain ke lebar ini
   * sehingga ukurannya presisi satu sama lain. Default: 120
   */
  logoWidth?: number;
  /**
   * Tinggi logo yang seragam (px). Default: 48
   */
  logoHeight?: number;
  /**
   * Jarak antar logo (px). Default: 64
   */
  gap?: number;
  /**
   * Lebar area gradien fade di sisi kiri & kanan (px). Default: 160
   */
  fadeWidth?: number;
  /** Pause animasi saat kursor hover di atas marquee. Default: true */
  pauseOnHover?: boolean;
  /** Warna background untuk menyesuaikan gradien fade. Default: "#0a0a0a" */
  backgroundColor?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// KOMPONEN UTAMA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * InfiniteMarquee
 *
 * Komponen infinite loop scrolling untuk menampilkan logo brand partner.
 * Menggunakan teknik CSS `translateX` animation dengan JavaScript untuk
 * menghitung lebar track secara dinamis — sehingga seamless loop bekerja
 * pada jumlah brand berapapun.
 *
 * Cara kerja seamless loop:
 * 1. Track item di-duplicate (clone) agar saat item pertama habis tergeser,
 *    item clone langsung menyambung tanpa jeda visual.
 * 2. Animasi di-reset ketika sudah mencapai setengah panjang track (set asli).
 * 3. Semua logo diberi dimensi tetap (logoWidth × logoHeight) dengan
 *    `object-fit: contain` agar proporsional dan seragam.
 */
const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  brands,
  duration = 30,
  logoWidth = 120,
  logoHeight = 60,
  gap = 64,
  fadeWidth = 160,
  pauseOnHover = true,
  backgroundColor = "#0a0a0a",
}) => {
  // Ref ke element track utama (berisi item asli + clone)
  const trackRef = useRef<HTMLDivElement>(null);

  // State untuk toggle pause via hover
  const [isPaused, setIsPaused] = useState(false);

  // Lebar satu item (logo + gap) — digunakan untuk kalkulasi durasi proporsional
  const itemWidth = logoWidth + gap;

  // Total lebar set asli (tanpa clone) dalam piksel
  const totalSetWidth = brands.length * itemWidth;

  /**
   * Durasi animasi disesuaikan proporsional terhadap jumlah brand.
   * Sehingga kecepatan scrool per-piksel tetap konstan meski jumlah brand berubah.
   */
  const adjustedDuration = duration;

  // ── Kita pakai CSS custom property untuk steuerung pause/play ──
  const animationPlayState = isPaused ? "paused" : "running";

  return (
    <section
      className="marquee-section"
      style={
        {
          // CSS custom properties untuk theming & override dari luar
          "--bg": backgroundColor,
          "--fade-width": `${fadeWidth}px`,
          "--logo-w": `${logoWidth}px`,
          "--logo-h": `${logoHeight}px`,
          "--gap": `${gap}px`,
          "--duration": `${adjustedDuration}s`,
          "--total-width": `${totalSetWidth}px`,
          "--play-state": animationPlayState,
        } as React.CSSProperties
      }
      aria-label="Brand partners"
    >
      {/* ── Wrapper: posisi relative untuk overlay gradien ── */}
      <div
        className="marquee-wrapper"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {/* Fade gradien kiri */}
        <div className="marquee-fade marquee-fade--left" aria-hidden="true" />

        {/* Viewport: overflow hidden, hanya ini yang terlihat user */}
        <div className="marquee-viewport" aria-hidden="true">
          {/*
           * Track: berisi 2× set brand (asli + clone).
           * Animasi menggeser track ke kiri sebesar `totalSetWidth`,
           * lalu instantly reset ke 0 — seamless karena clone langsung menyambung.
           */}
          <div className="marquee-track" ref={trackRef}>
            {/* Set asli */}
            {brands.map((brand, i) => (
              <BrandItem
                key={`original-${i}`}
                brand={brand}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                gap={gap}
              />
            ))}

            {/* Set clone: duplikat untuk seamless loop */}
            {brands.map((brand, i) => (
              <BrandItem
                key={`clone-${i}`}
                brand={brand}
                logoWidth={logoWidth}
                logoHeight={logoHeight}
                gap={gap}
              />
            ))}
          </div>
        </div>

        {/* Fade gradien kanan */}
        <div className="marquee-fade marquee-fade--right" aria-hidden="true" />
      </div>

      {/* ── Scoped CSS menggunakan <style jsx> pattern ── */}
      <style>{`
        /* ──────────────────────────────────────────────
           SECTION WRAPPER
        ────────────────────────────────────────────── */
        .marquee-section {
          width: 100%;
          background-color: var(--bg);
          padding: 48px 0;
          overflow: hidden;
        }

        /* ──────────────────────────────────────────────
           JUDUL
        ────────────────────────────────────────────── */
        .marquee-title {
          text-align: center;
          color: #ffffff;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0 0 36px;
        }

        /* ──────────────────────────────────────────────
           WRAPPER: kontainer relatif untuk overlay gradien
        ────────────────────────────────────────────── */
        .marquee-wrapper {
          position: relative;
          width: 100%;
        }

        /* ──────────────────────────────────────────────
           VIEWPORT: area yang terlihat, clips overflow
        ────────────────────────────────────────────── */
        .marquee-viewport {
          overflow: hidden;
          width: 100%;
        }

        /* ──────────────────────────────────────────────
           TRACK: barisan semua item (asli + clone)
           Animasi CSS keyframe menggeser ke kiri
        ────────────────────────────────────────────── */
        .marquee-track {
          display: flex;
          align-items: center;
          /* width: fit-content agar track tidak wrap */
          width: fit-content;
          animation: marquee-scroll var(--duration) linear infinite;
          animation-play-state: var(--play-state);
          /* Optimasi GPU compositing */
          will-change: transform;
        }

        /* ──────────────────────────────────────────────
           ITEM: wrapper per logo brand
        ────────────────────────────────────────────── */
        .marquee-item {
          /* Flex-shrink: 0 — agar item tidak menyusut */
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--logo-w);
          height: var(--logo-h);
          margin-right: var(--gap);
        }

        /* ──────────────────────────────────────────────
           LOGO IMAGE: ukuran presisi, proporsional
        ────────────────────────────────────────────── */
        .marquee-logo {
          /* Constrain ke dimensi kontainer, pertahankan aspek rasio */
          max-width: 100%;
          max-height: 100%;
          width: var(--logo-w);
          height: var(--logo-h);
          object-fit: contain;
          /* Filter grayscale & opacity agar tampak monokrom seperti referensi */
          filter: grayscale(100%) brightness(0.6) contrast(1.1);
          opacity: 0.7;
          transition: filter 0.3s ease, opacity 0.3s ease;
          /* Optimasi rendering */
          image-rendering: -webkit-optimize-contrast;
        }

        /* Hover: tampilkan logo lebih terang */
        .marquee-item:hover .marquee-logo {
          filter: grayscale(0%) brightness(1) contrast(1);
          opacity: 1;
        }

        /* ──────────────────────────────────────────────
           FADE OVERLAY: gradien kiri & kanan
           Menggunakan pseudo-element atau div overlay
        ────────────────────────────────────────────── */
        .marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: var(--fade-width);
          z-index: 2;
          pointer-events: none; /* tidak menghalangi interaksi */
        }

        .marquee-fade--left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--bg) 0%,
            transparent 100%
          );
        }

        .marquee-fade--right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--bg) 0%,
            transparent 100%
          );
        }

        /* ──────────────────────────────────────────────
           KEYFRAME ANIMASI
           Geser track ke kiri sejauh total lebar 1 set (asli).
           Karena ada clone, posisi akhir = posisi awal set clone,
           sehingga reset ke 0 tidak terlihat.
        ────────────────────────────────────────────── */
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(var(--total-width) * -1)); }
        }

        /* ──────────────────────────────────────────────
           AKSESIBILITAS: reduced-motion
        ────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-KOMPONEN: BrandItem
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BrandItem
 *
 * Menampilkan satu logo brand di dalam marquee track.
 * Dimensi dikontrol ketat via props agar semua logo seragam.
 */
interface BrandItemProps {
  brand: Brand;
  logoWidth: number;
  logoHeight: number;
  gap: number;
}

const BrandItem: React.FC<BrandItemProps> = ({
  brand,
  logoWidth,
  logoHeight,
  gap,
}) => (
  <div
    className="marquee-item"
    title={brand.name}
    style={{
      width: logoWidth,
      height: logoHeight,
      marginRight: gap,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src={brand.logo}
      alt={brand.name}
      className="marquee-logo"
      width={logoWidth}
      height={logoHeight}
      loading="lazy"
      draggable={false}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        userSelect: "none",
      }}
    />
  </div>
);

export default InfiniteMarquee;

// ─────────────────────────────────────────────────────────────────────────────
// CONTOH PENGGUNAAN (letakkan di page/layout yang sesuai)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Contoh data brands — ganti `logo` dengan path aset nyata Anda:
 *
 * const BRANDS: Brand[] = [
 *   { name: "Chery",   logo: "/logos/chery.svg"   },
 *   { name: "Citroën", logo: "/logos/citroen.svg" },
 *   { name: "WRP",     logo: "/logos/wrp.svg"     },
 *   { name: "Wuling",  logo: "/logos/wuling.svg"  },
 *   { name: "Tempra",  logo: "/logos/tempra.svg"  },
 * ];
 *
 * export default function HomePage() {
 *   return (
 *     <main>
 *       <InfiniteMarquee
 *         brands={BRANDS}
 *         duration={25}           // kecepatan scroll
 *         logoWidth={120}         // lebar seragam semua logo
 *         logoHeight={48}         // tinggi seragam semua logo
 *         gap={72}                // jarak antar logo
 *         fadeWidth={180}         // lebar area fade kiri/kanan
 *         pauseOnHover={true}     // pause saat hover
 *         backgroundColor="#0a0a0a"
 *       />
 *     </main>
 *   );
 * }
 */
