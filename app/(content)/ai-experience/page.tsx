"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FormCustomer from "@/components/form-customer";

import HeroSection from "./components/hero-section";
import JourneySection from "./components/journey-section";
import SuccessStoriesSection from "./components/success-stories-section";
import CapabilitiesSection from "./components/capabilities-section";
import PartnershipSection from "./components/partnership-section";
import ImplementationSection from "./components/implementation-section";

/**
 * AIExperiencePage
 *
 * Halaman AI Xperience — CaptivAd × IUPA.AI
 *
 * Struktur section:
 *   §1  HeroSection          — headline, pillars, neural pulse
 *   §2  JourneySection       — 4-step architecture (bg putih)
 *   §3  SuccessStoriesSection — 2 kartu campaign + YouTube modal
 *   §4  CapabilitiesSection  — bento grid capabilities
 *   §5  PartnershipSection   — 2 kolom + bg image parallax
 *   §6  ImplementationSection — Cloud vs Enterprise process
 *   §7  Form CTA
 */
export default function AIExperiencePage() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useInView(formRef, { once: true, margin: "-20% 0px" });

  return (
    <>
      <HeroSection />
      <JourneySection />
      <SuccessStoriesSection />
      <CapabilitiesSection />
      <PartnershipSection />
      <ImplementationSection />

      {/* ═══ §7 Form CTA ═══════════════════════════════════════════ */}
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
    </>
  );
}
