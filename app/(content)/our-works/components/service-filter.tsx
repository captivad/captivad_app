"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// SIZE VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ukuran badge yang tersedia.
 * - xs : sangat kecil, cocok untuk sidebar atau filter inline
 * - sm : kecil (default)
 * - md : sedang, cocok untuk section header
 * - lg : besar, cocok untuk hero filter
 */
type FilterSize = "xs" | "sm" | "md" | "lg";

const SIZE_MAP: Record<
  FilterSize,
  {
    padding: string;
    fontSize: string;
    gap: string;
    dot: string;
    skeletonH: string;
    skeletonW: string[]; // lebar skeleton per badge (variasi agar natural)
  }
> = {
  xs: {
    padding: "px-2.5 py-1",
    fontSize: "text-[9px]",
    gap: "gap-1.5",
    dot: "w-1 h-1",
    skeletonH: "h-5",
    skeletonW: ["w-8", "w-16", "w-20", "w-14", "w-12"],
  },
  sm: {
    padding: "px-4 py-1.5",
    fontSize: "text-[11px]",
    gap: "gap-2",
    dot: "w-1.5 h-1.5",
    skeletonH: "h-7",
    skeletonW: ["w-10", "w-24", "w-28", "w-20", "w-16"],
  },
  md: {
    padding: "px-5 py-2",
    fontSize: "text-xs",
    gap: "gap-2",
    dot: "w-2 h-2",
    skeletonH: "h-9",
    skeletonW: ["w-12", "w-28", "w-32", "w-24", "w-20"],
  },
  lg: {
    padding: "px-6 py-2.5",
    fontSize: "text-sm",
    gap: "gap-2.5",
    dot: "w-2 h-2",
    skeletonH: "h-11",
    skeletonW: ["w-14", "w-32", "w-36", "w-28", "w-24"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceFilterItem {
  /** Nilai unik yang disimpan ke URL (e.g. "digital-placement") */
  value: string;
  /** Label yang ditampilkan di badge (e.g. "Digital Placement") */
  label: string;
}

interface ServiceFilterProps {
  /** Daftar item filter yang akan ditampilkan sebagai badge */
  items: ServiceFilterItem[];
  /**
   * Query param key yang digunakan di URL.
   * Default: "service"
   * Contoh: ?service=digital-placement
   */
  paramKey?: string;
  /**
   * Callback dipanggil setiap kali nilai filter berubah
   * (baik dari klik badge maupun perubahan URL secara eksternal).
   * value === null berarti filter "ALL" aktif.
   */
  onChange?: (value: string | null) => void;
  /** Label untuk badge "All". Default: "ALL" */
  allLabel?: string;
  /**
   * Ukuran badge. Default: "sm"
   * xs | sm | md | lg
   */
  size?: FilterSize;
  /**
   * Tampilkan state loading skeleton.
   * Jumlah skeleton yang dirender mengikuti jumlah `items` + 1 (ALL).
   */
  loading?: boolean;
  /** Class tambahan untuk wrapper */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — baca & tulis query param aktif
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useServiceFilter
 *
 * Mengelola sinkronisasi antara:
 *   - URL query param (?service=xxx)
 *   - State aktif badge
 *   - Callback onChange
 */
function useServiceFilter(
  paramKey: string,
  onChange?: (v: string | null) => void
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /** Nilai aktif saat ini dari URL (null = semua / ALL) */
  const activeValue = searchParams.get(paramKey) ?? null;

  /**
   * Set filter baru ke URL dan panggil onChange.
   * Jika value sama dengan aktif → reset ke ALL (toggle off).
   */
  const setFilter = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      // Toggle: klik nilai yang sama → reset ke ALL
      const next = value === activeValue ? null : value;

      if (next === null) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, next);
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });

      onChange?.(next);
    },
    [activeValue, onChange, paramKey, pathname, router, searchParams]
  );

  return { activeValue, setFilter, isPending };
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────

/**
 * FilterSkeleton — placeholder loading badge.
 * Lebar bervariasi agar terlihat natural (tidak monoton satu ukuran).
 * Menggunakan shimmer animation via CSS keyframe.
 */
function FilterSkeleton({ size, count }: { size: FilterSize; count: number }) {
  const s = SIZE_MAP[size];

  return (
    <>
      {/* Inject shimmer keyframe sekali saja */}
      <style>{`
        @keyframes filter-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .filter-skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.05) 75%
          );
          background-size: 200% 100%;
          animation: filter-shimmer 1.6s ease-in-out infinite;
        }
      `}</style>

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className={`
            filter-skeleton-shimmer
            ${s.skeletonH}
            ${s.skeletonW[i % s.skeletonW.length]}
            border border-white/[0.06]
          `}
          style={{ borderRadius: 0 }}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE ITEM
// ─────────────────────────────────────────────────────────────────────────────

function FilterBadge({
  label,
  isActive,
  onClick,
  isPending,
  size,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isPending: boolean;
  size: FilterSize;
}) {
  const s = SIZE_MAP[size];
  return (
    <motion.button
      onClick={onClick}
      disabled={isPending}
      whileTap={{ scale: 0.95 }}
      className={`
        relative inline-flex items-center
        ${s.gap} ${s.padding} ${s.fontSize}
        uppercase tracking-widest
        transition-colors duration-200 select-none outline-none
        focus-visible:ring-1 focus-visible:ring-white/40
        disabled:pointer-events-none
      `}
      style={{
        border: isActive
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid rgba(255,255,255,0.1)",
        background: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.03)",
        color: isActive ? "#000" : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
        borderRadius: "999px",
      }}
      aria-pressed={isActive}
    >
      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className={`${s.dot} rounded-full bg-black flex-shrink-0`}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {label}

      {/* Loading shimmer saat router transition */}
      {isPending && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          aria-hidden
        />
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ServiceFilter
 *
 * Komponen filter badge yang:
 * 1. Menerima `items` sebagai daftar pilihan filter
 * 2. Menyimpan nilai aktif ke URL query param (`?service=xxx`)
 * 3. Memanggil `onChange(value)` setiap kali filter berubah
 * 4. Sinkron dua arah — jika URL berubah dari luar (back/forward),
 *    state badge ikut update otomatis via `useSearchParams`
 *
 * Contoh penggunaan:
 * ```tsx
 * const FILTERS = [
 *   { value: "digital-placement", label: "Digital Placement" },
 *   { value: "interactive-video", label: "Interactive Video" },
 *   { value: "ai-microsite",      label: "AI Microsite" },
 *   { value: "rich-media",        label: "Rich Media" },
 * ];
 *
 * <ServiceFilter
 *   items={FILTERS}
 *   onChange={(value) => console.log("Active filter:", value)}
 * />
 * ```
 */
export default function ServiceFilter({
  items,
  paramKey = "service",
  onChange,
  allLabel = "ALL",
  size = "sm",
  loading = false,
  className = "",
}: ServiceFilterProps) {
  const { activeValue, setFilter, isPending } = useServiceFilter(
    paramKey,
    onChange
  );

  return (
    <div
      role="group"
      aria-label="Filter services"
      aria-busy={loading}
      className={`flex flex-wrap ${SIZE_MAP[size].gap} ${className}`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          /* ── Skeleton state ── */
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex flex-wrap ${SIZE_MAP[size].gap}`}
          >
            {/* +1 untuk badge ALL */}
            <FilterSkeleton size={size} count={items.length + 1} />
          </motion.div>
        ) : (
          /* ── Badge state ── */
          <motion.div
            key="badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-wrap ${SIZE_MAP[size].gap}`}
          >
            {/* Badge ALL */}
            <FilterBadge
              label={allLabel}
              isActive={activeValue === null}
              onClick={() => setFilter(null)}
              isPending={isPending}
              size={size}
            />

            {/* Badge per service */}
            {items.map((item) => (
              <FilterBadge
                key={item.value}
                label={item.label}
                isActive={activeValue === item.value}
                onClick={() => setFilter(item.value)}
                isPending={isPending}
                size={size}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT HOOK — untuk parent yang butuh baca activeValue tanpa render filter
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useActiveServiceFilter
 *
 * Baca nilai filter aktif dari URL tanpa merender UI filter.
 * Berguna untuk page/komponen yang perlu reaktif terhadap filter
 * tanpa mengulang logika URL parsing.
 *
 * Contoh:
 * ```tsx
 * const activeFilter = useActiveServiceFilter();
 * const filtered = services.filter(s =>
 *   activeFilter === null || s.category === activeFilter
 * );
 * ```
 */
export function useActiveServiceFilter(paramKey = "service"): string {
  const searchParams = useSearchParams();
  return searchParams.get(paramKey) ?? "";
}
