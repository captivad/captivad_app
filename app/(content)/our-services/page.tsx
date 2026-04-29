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
import ModalAddService from "./components/modal-add-service";
import { useSession } from "next-auth/react";
import { StatusContent } from "@/prisma/prisma/client";
import ModalEditService from "./components/modal-edit-service";
import { IListGetService } from "@/app/api/our-services/our-service.interface";
import ModalConfirmAlert from "@/components/modal-confirm";
import { IPayloadUpdateOurService } from "@/app/api/admin/our-services/our-service.interface";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";
import useSectionVisibility from "./hooks/use-section-visibility";
import ServiceRow from "./components/service-row";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — intersection-based section visibility
// ─────────────────────────────────────────────────────────────────────────────

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
