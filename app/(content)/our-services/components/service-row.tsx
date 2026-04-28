// ─────────────────────────────────────────────────────────────────────────────
// SERVICE ROW — desain editorial seperti referensi gambar
// ─────────────────────────────────────────────────────────────────────────────

import { IListGetService } from "@/app/api/our-services/our-service.interface";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import parseDeliverables from "../utils/our-service-utils";
import { StatusContent } from "@/prisma/prisma/client";
import Link from "next/link";
import { OUR_WORK } from "@/utils/router";
import { ArrowRight, Pencil, Trash2, Upload } from "lucide-react";

export default function ServiceRow({
  item,
  index,
  isAuthenticated,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  item: IListGetService;
  index: number;
  isAuthenticated: boolean;
  onEdit: (item: IListGetService) => void;
  onDelete: (item: IListGetService) => void;
  onToggleStatus: (item: IListGetService) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  const { body, deliverables } = parseDeliverables(
    item.description_service || ""
  );

  // Nomor urut dua digit
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="group border-b border-white/[0.08] last:border-none"
    >
      {/* ── Row utama ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-10 py-10 lg:py-14">
        {/* Kolom 1 — Nomor */}
        <div className="flex items-start pt-1">
          <span className="font-mono text-white/50 text-4xl lg:text-5xl font-bold leading-none tabular-nums">
            {num}
          </span>
        </div>

        {/* Kolom 2 — Nama + Deskripsi + CTA */}
        <div className="flex flex-col gap-4">
          {/* Badge status (admin only) */}
          {isAuthenticated && (
            <span
              className="self-start text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
              style={{
                borderColor:
                  item.status === StatusContent.draft
                    ? "rgba(59,130,246,0.4)"
                    : "rgba(34,197,94,0.4)",
                color:
                  item.status === StatusContent.draft
                    ? "rgba(147,197,253,0.7)"
                    : "rgba(134,239,172,0.7)",
              }}
            >
              {item.status}
            </span>
          )}

          {/* Nama service */}
          <h2
            className="font-bold leading-tight tracking-tight uppercase"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            {item.name_service}
          </h2>

          {/* Deskripsi (tanpa bagian deliverables) */}
          <p className="text-white text-lg leading-relaxed max-w-[480px]">
            {body}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-2">
            <Link
              href={`${OUR_WORK}?service=${item.uuid}`}
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 group/link"
            >
              <span>Explore</span>
              <ArrowRight
                size={14}
                className="group-hover/link:translate-x-1 transition-transform duration-300"
              />
            </Link>

            {/* Admin controls */}
            {isAuthenticated && (
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onToggleStatus(item)}
                  className="tooltip tooltip-top"
                  data-tip={
                    item.status === StatusContent.draft
                      ? "Publish"
                      : "Unpublish"
                  }
                >
                  <kbd
                    className="kbd"
                    style={{
                      backgroundColor:
                        item.status === StatusContent.draft
                          ? "rgba(59,130,246,0.3)"
                          : "rgba(239,68,68,0.3)",
                    }}
                  >
                    <Upload
                      size={14}
                      color="white"
                      className={
                        item.status === StatusContent.publish
                          ? "rotate-180"
                          : ""
                      }
                    />
                  </kbd>
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="tooltip tooltip-top"
                  data-tip="Edit"
                >
                  <kbd className="kbd">
                    <Pencil size={14} color="white" />
                  </kbd>
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="tooltip tooltip-top"
                  data-tip="Delete"
                >
                  <kbd className="kbd">
                    <Trash2 size={14} color="white" />
                  </kbd>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Kolom 3 — Deliverables */}
        {deliverables.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-mono uppercase tracking-[0.25em] text-white mb-1">
              Deliverables
            </p>
            <ul className="flex flex-col gap-[10px]">
              {deliverables.map((d, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.3 + index * 0.1 + i * 0.06,
                  }}
                  className="flex items-center gap-3 group/del border-b border-white/[0.06] pb-[10px] last:border-none last:pb-0"
                >
                  {/* Arrow aksen merah seperti referensi */}
                  <ArrowRight
                    size={12}
                    className="flex-shrink-0 text-white/20 group-hover/del:text-red-500 transition-colors duration-200"
                    style={{ color: "rgba(220,50,30,0.5)" }}
                  />
                  <span className="text-sm font-mono uppercase tracking-[0.12em] text-white/60 group-hover/del:text-white transition-colors duration-200">
                    {d}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
