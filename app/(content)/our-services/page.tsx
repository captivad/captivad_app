"use client";

import FormCustomer from "@/components/form-customer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Pencil, Plus, Trash2, Upload } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import { OUR_SERVICES, OUR_WORK } from "@/utils/router";
import {
  useDeleteService,
  useEditService,
  useGetListService,
} from "./our-service.web.service";
import Link from "next/link";
import ModalAddService from "./components/ModalAddService";
import { useSession } from "next-auth/react";
import { StatusContent } from "@/prisma/prisma/client";
import ModalEditService from "./components/ModalEditService";
import { IListGetService } from "@/app/api/our-services/our-service.interface";
import ModalConfirmAlert from "@/components/modal-confirm";
import { IPayloadUpdateOurService } from "@/app/api/admin/our-services/our-service.interface";

// ─────────────────────────────────────────────────────────────────────────────
// UTILS — parse deliverables dari deskripsi
// Format: "...some text. deliverables: item one, item two, item three"
// ─────────────────────────────────────────────────────────────────────────────

function parseDeliverables(description: string): {
  body: string;
  deliverables: string[];
} {
  const lower = description.toLowerCase();
  const idx = lower.indexOf("deliverables:");

  if (idx === -1) return { body: description.trim(), deliverables: [] };

  const body = description
    .slice(0, idx)
    .trim()
    .replace(/\.\s*$/, ".");
  const raw = description.slice(idx + "deliverables:".length).trim();
  const deliverables = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").toUpperCase());

  return { body, deliverables };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SplitWords — per-kata blur→sharp reveal, viewport-triggered.
 */
function SplitWords({
  text,
  delay = 0,
  stagger = 0.07,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.28em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * ScanLine — garis scan horizontal tipis, nuansa HUD/terminal.
 */
function ScanLine({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`w-full h-px bg-white/10 relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[28%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.3, ease: "easeInOut", delay }}
      />
    </div>
  );
}

/**
 * FadeUp — generic viewport-triggered fade+slide.
 */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE ROW — desain editorial seperti referensi gambar
// ─────────────────────────────────────────────────────────────────────────────

function ServiceRow({
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
          <p className="text-white text-sm md:text-base leading-relaxed max-w-[480px]">
            {body}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-2">
            <Link
              href={`${OUR_WORK}?service=${item.uuid}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 group/link"
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
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/25 mb-1">
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
                  <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/60 group-hover/del:text-white transition-colors duration-200">
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

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — intersection-based section visibility
// ─────────────────────────────────────────────────────────────────────────────

function useSectionVisibility(keys: string[], threshold = 0.15) {
  const [visible, setVisible] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(keys.map((k) => [k, false]))
  );

  const refs = React.useMemo(
    () =>
      Object.fromEntries(
        keys.map((k) => [k, React.createRef<HTMLDivElement>()])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    const observers = Object.entries(refs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisible((prev) => ({ ...prev, [key]: true }));
        },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [refs, threshold]);

  return { visible, refs };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function OurServices() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const { data, isLoading } = useGetListService();
  const { mutate: mutateDelete } = useDeleteService();
  const { mutate: mutateEdit } = useEditService({ onSuccess: () => {} });

  const [selectedService, setSelectedService] = React.useState<IListGetService>(
    {} as IListGetService
  );
  const [isOpen, setIsOpen] = React.useState<"delete" | "status" | "">("");

  const { visible, refs } = useSectionVisibility(["intro", "services", "form"]);

  // Scroll ke top saat mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && refs.intro.current) {
      refs.intro.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [refs.intro]);

  // Parallax untuk hero image
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Handler admin actions
  function handleEdit(item: IListGetService) {
    setSelectedService(item);
    (document.getElementById("my_modal_2") as HTMLDialogElement)?.showModal();
  }

  function handleDelete(item: IListGetService) {
    setIsOpen("delete");
    setSelectedService(item);
    (
      document.getElementById(`my_modal_${item.uuid}`) as HTMLDialogElement
    )?.showModal();
  }

  function handleToggleStatus(item: IListGetService) {
    setIsOpen("status");
    setSelectedService(item);
    (
      document.getElementById(`my_modal_${item.uuid}`) as HTMLDialogElement
    )?.showModal();
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          §1  SERVICE LIST — editorial numbered list
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={refs.services as React.RefObject<HTMLDivElement>}
        id="section-services"
        className="relative w-full bg-background overflow-hidden"
        style={{
          // Subtle noise texture via repeating gradient — AI/industrial feel
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,255,255,0.015) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 80% 80%, rgba(255,255,255,0.01) 0%, transparent 60%)
          `,
        }}
      >
        {/* Background image dengan parallax */}
        <motion.div
          aria-hidden
          className="hidden md:block absolute inset-0 scale-110"
          style={{ y: heroBgY }}
        >
          <Image
            src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776922026/our-service-section1_prbih7.svg"
            fill
            alt=""
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay gradient — dark vignette */}
        <div
          aria-hidden
          className="absolute inset-0 scale-[200%]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <div className="w-full max-w-[80%] lg:max-w-[70%] mx-auto xl:px-12 py-[10rem] md:py-[15rem]">
          {/* Header section */}
          <div className="flex items-center justify-between mb-10 lg:mb-16">
            <FadeUp>
              <p className="text-lg font-mono text-white/80 uppercase tracking-[0.3em]">
                What We Do
              </p>
            </FadeUp>

            {/* Add service button (admin) */}
            {isAuthenticated && (
              <FadeUp delay={0.1}>
                <button
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLDialogElement
                    )?.showModal()
                  }
                  className="btn btn-sm rounded-badge border-white/20 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white gap-2 font-mono text-xs tracking-widest uppercase"
                >
                  <Plus size={14} />
                  Add Service
                </button>
              </FadeUp>
            )}
          </div>

          {/* Top separator */}
          <ScanLine delay={0.2} />

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col gap-8 mt-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="skeleton h-32 w-full opacity-10 rounded"
                />
              ))}
            </div>
          )}

          {/* Service rows */}
          {!isLoading &&
            ((data as IListGetService[]) || []).map((item, index) => (
              <ServiceRow
                key={item.uuid}
                item={item}
                index={index}
                isAuthenticated={isAuthenticated}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background, #080808))",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §3  FORM
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={refs.form as React.RefObject<HTMLDivElement>}
        id="form"
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {visible.form && <FormCustomer />}
      </section>

      {/* ── Modals ── */}
      <ModalAddService />
      <ModalEditService data={selectedService} />

      {isOpen === "delete" && (
        <ModalConfirmAlert
          title="Delete Service"
          description={`Are you sure you want to delete "${selectedService.name_service}"?`}
          submitLabel="Delete"
          id={selectedService.uuid!}
          onSubmit={() => mutateDelete(selectedService.uuid!)}
        />
      )}

      {isOpen === "status" && (
        <ModalConfirmAlert
          title={
            selectedService.status === StatusContent.publish
              ? "Unpublish"
              : "Publish"
          }
          description={`Are you sure you want to ${
            selectedService.status === StatusContent.publish
              ? "unpublish"
              : "publish"
          } "${selectedService.name_service}"?`}
          submitLabel={
            selectedService.status === StatusContent.publish
              ? "Unpublish"
              : "Publish"
          }
          id={selectedService.uuid!}
          onSubmit={() =>
            mutateEdit({
              payload: {
                nameService: selectedService.name_service,
                descriptionService: selectedService.description_service,
                detailTitle: selectedService.detail_title,
                mainContatent: selectedService.main_content,
                status:
                  selectedService.status === StatusContent.publish
                    ? "draft"
                    : "publish",
              } as IPayloadUpdateOurService,
              id: selectedService.uuid!,
            })
          }
          color={
            selectedService.status === StatusContent.publish ? "red" : "blue"
          }
        />
      )}
    </>
  );
}
