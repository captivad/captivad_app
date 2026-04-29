"use client";

import FormCustomer from "@/components/form-customer";
import { motion, useInView } from "framer-motion";
import React, { useRef, useMemo } from "react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "next-cloudinary/dist/cld-video-player.css";
import LogoForm from "@/public/logo-no-text.svg";
import { useGetOurWorkByService } from "./our-work.web.service";
import { IResponseListOurWork } from "@/app/api/our-work/our-work.interface";
import { useGetListService } from "../our-services/our-service.web.service";
import ModalAddWork from "./components/modal-add-work";
import ServiceFilter, {
  ServiceFilterItem,
  useActiveServiceFilter,
} from "./components/service-filter";
import SplitWords from "@/components/split-words";
import ScanLine from "@/components/scan-line";
import FadeUp from "@/components/fade-up";
import PortfolioSlideshow from "./components/portfolio-slide-show";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface IPortfolio extends IResponseListOurWork {}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const activeFilter = useActiveServiceFilter();

  /**
   * Fetch portfolio data by service
   */
  const { data: listData, isLoading: listIsLoading } = useGetOurWorkByService({
    serviceId: activeFilter,
  });

  const { data: listServiceData, isLoading: listServiceIsLoading } =
    useGetListService();

  // Ganti MOCK_PORTFOLIOS dengan data dari API / React Query
  const portfolios = useMemo(() => {
    if (!listData) return [];
    return listData;
  }, [listData]);

  const FILTERS: ServiceFilterItem[] = useMemo(() => {
    if (!listServiceData) return [];
    return listServiceData.map((item) => ({
      label: item.name_service,
      value: item.uuid,
    }));
  }, [listServiceData]);

  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useInView(formRef, { once: true, margin: "-20% 0px" });

  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          §1  HERO — headline section
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        id="portfolio-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full bg-background flex flex-col justify-end pt-28 pb-10 md:pt-36 md:pb-12 overflow-hidden"
      >
        <div className="h-full w-[50%] overflow-hidden absolute z-0 top-0 bottom-0 -right-20">
          <Image
            src={LogoForm}
            fill
            alt="bg-section1"
            className=" object-contain"
          />
        </div>

        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-10% via-black/80 to-background z-10"></div>

        {/* Dot grid — AI nuance */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 80%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[90%] mx-auto mt-[10%] xl:px-12 flex flex-col gap-5">
          {/* Headline — 2-tone seperti referensi */}
          <h1
            className="leading-[1.0] tracking-tight font-bold uppercase"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            <SplitWords text="CAMPAIGNS THAT" delay={0.2} stagger={0.08} />
            <br />
            {/* "MOVED METRICS" — aksen merah */}
            <span className="inline-flex flex-wrap">
              {["MOVED", "METRICS."].map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    marginRight: "0.28em",
                  }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                    }}
                    className="text-white/50 italic pr-4"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.55 + i * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <ScanLine delay={0.9} className="mt-2 max-w-[30%]" />
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════
          §2  SLIDESHOW
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="portfolio-slideshow"
        className="relative w-full bg-background"
      >
        <div className="w-full min-h-[60vh] max-w-[90%] mx-auto xl:px-12 flex flex-col gap-4 pb-16">
          {/*filter service */}
          <ServiceFilter
            items={FILTERS}
            size="lg"
            loading={listServiceIsLoading}
          />
          {/* Add button (admin) */}
          {isAuthenticated && (
            <FadeUp className="flex justify-end mb-2">
              <button
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_add_ourwork"
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  } else {
                    console.error("Modal element not found");
                  }
                }}
                className="btn btn-sm rounded-badge border-white/20 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white gap-2 font-mono text-xs tracking-widest uppercase"
              >
                <Plus size={14} />
                Add Portfolio
              </button>
            </FadeUp>
          )}

          {/* Main slideshow */}
          {!listIsLoading && (
            <FadeUp>
              <PortfolioSlideshow
                items={portfolios as unknown as IPortfolio[]}
                isAuthenticated={isAuthenticated}
              />
            </FadeUp>
          )}

          {/* Thumbnail strip */}
          {/* <FadeUp delay={0.2}>
            <ThumbnailStrip
              items={portfolios}
              active={activeSlide}
              onSelect={setActiveSlide}
            />
          </FadeUp> */}
        </div>

        {/* Subtle background texture untuk section ini */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 60% at 80% 30%, rgba(255,255,255,0.015) 0%, transparent 60%),
              radial-gradient(ellipse 40% 50% at 10% 80%, rgba(255,255,255,0.01) 0%, transparent 60%)
            `,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §3  FORM
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={formRef}
        id="form"
        initial={{ opacity: 0, y: 60 }}
        animate={isFormVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {isFormVisible && <FormCustomer />}
      </motion.section>
      <ModalAddWork />
    </>
  );
}
