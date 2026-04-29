"use client";

import { PROCESSES } from "../data";
import NodeGrid from "@/components/node-grid";
import GlowOrb from "@/components/glow-orb";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";

/**
 * ImplementationSection
 *
 * §6 — "Distinct Implementation Processes"
 * Dua kolom: Cloud Platform Process vs Enterprise Bespoke Process.
 */
export default function ImplementationSection() {
  return (
    <section className="relative w-full bg-white border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
      <NodeGrid opacity={0.03} />
      <GlowOrb x="70%" y="30%" size="50%" opacity={0.03} />

      <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center">
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}>
            <SplitWords
              text="Distinct Implementation Processes"
              delay={0.1}
              stagger={0.07}
              className="text-black"
            />
            <br />
            {/* <span className="text-black/40 italic">
              <SplitWords text="Processes." delay={0.4} stagger={0.1} />
            </span> */}
          </h2>
          <FadeUp delay={0.2}>
            <p className="text-black">
              Choose an approach that fits your timeline and technical needs.
            </p>
          </FadeUp>
        </div>

        <ScanLine delay={0.3} />

        {/* Process columns */}
        <div
          className="flex flex-col lg:flex-row justify-center gap-10 items-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {Object.entries(PROCESSES).map(([key, proc], i) => (
            <FadeUp
              key={key}
              delay={i * 0.15}
              className="flex flex-col gap-7 p-8 md:p-10 border-2 rounded-xl max-w-[600px]"
            >
              {/* Header */}
              <div className="flex gap-3">
                <proc.icon size={30} className="text-black" />
                <h5 className="uppercase tracking-widest text-black">
                  {proc.label}
                </h5>
              </div>
              <ScanLine delay={0.4 + i * 0.1} />

              {/* Steps */}
              <ol className="flex flex-col items-start gap-4">
                {proc.steps.map((step, j) => (
                  <FadeUp key={step} delay={0.5 + j * 0.1}>
                    <li className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-black font-mono text-white tabular-nums mt-0.5">
                        {j + 1}
                      </span>
                      <span className=" text-black leading-snug">{step}</span>
                    </li>
                  </FadeUp>
                ))}
              </ol>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
