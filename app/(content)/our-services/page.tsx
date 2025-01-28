"use client";

import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import { ArrowRight, Pencil, Plus, Trash2, Upload } from "lucide-react";
import React from "react";
import Image from "next/image";
import BgSection1 from "@/public/our-service-section1.svg";
import { OUR_SERVICES } from "@/utils/router";
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
import toast from "react-hot-toast";
import { IPayloadUpdateOurService } from "@/app/api/admin/our-services/our-service.interface";

export default function OurServices() {
  const { status } = useSession();
  const { data, isLoading, refetch } = useGetListService();
  const [visibleSections, setVisibleSections] = React.useState({
    intro: false,
    accordion: false,
    form: false,
  });
  const [selectedService, setSelectedService] = React.useState<IListGetService>(
    {} as IListGetService
  );
  const [isOpen, setIsOpen] = React.useState<string>("");

  const { mutate } = useDeleteService();
  const { mutate: mutateEdit } = useEditService({
    onSuccess: () => {},
  });

  const sectionRefs = React.useMemo(
    () => ({
      intro: React.createRef<HTMLDivElement>(),
      accordion: React.createRef<HTMLDivElement>(),
      form: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  React.useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionRefs]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && sectionRefs.intro.current) {
      sectionRefs.intro.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionRefs.intro]);

  return (
    <>
      {/* ###########################  section-1  ############################ */}
      <motion.section
        ref={sectionRefs.intro}
        id="section-intro"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="relative w-full md:h-[80vh] lg:h-dvh bg-background flex justify-center pt-44 md:pt-0 md:items-center"
      >
        <Image
          // width={500}
          // height={500}
          src={BgSection1}
          fill
          objectFit="cover"
          alt="bg-section1"
          className="absolute z-0 top-0 left-0 w-full h-dvh object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[70%] text-center z-20 px-[10%] md:px-0"
        >
          <h1 className="text-center lg:text-left lg:max-w-[90%]">
            {`Complete solutions for your brand's transformation`}
          </h1>
          <h4 className="my-6 text-center lg:text-left">
            We care for and encourage the growth or development of knowledge,
            help or encourage the development of knowledge and skills of all
            CaptivAd.
          </h4>
        </motion.div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/50 to-background z-10"></div>
      </motion.section>

      {/* ###########################  section-2  ############################ */}
      <motion.section
        ref={sectionRefs.accordion}
        id="section-accordion"
        style={{ paddingTop: "10px" }}
        className="w-full h-auto bg-black p-[10%] lg:p-20 flex flex-col justify-center gap-1 md:gap-6"
      >
        {status === "authenticated" && (
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              } else {
                console.error("Modal element not found");
              }
            }}
            className="btn md:max-w-60 rounden-box"
          >
            <Plus size={25} />
            Add Service
          </button>
        )}
        {visibleSections.accordion &&
          !isLoading &&
          ((data as IListGetService[]) || []).map((item, index) => {
            const color = item.status == StatusContent.draft ? "blue" : "green";
            return (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.4 + index / 5,
                }}
                key={index}
                className="collapse collapse-arrow "
              >
                <input
                  type="radio"
                  name="my-accordion-2"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title bg-transparent border-b-2 border-white font-bold">
                  <h3>
                    {item.name_service}
                    {status === "authenticated" && (
                      <div
                        style={{ backgroundColor: color }}
                        className="ml-2 badge text-foreground"
                      >
                        {item.status}
                      </div>
                    )}
                  </h3>
                </div>
                <div className="collapse-content">
                  <div className="flex justify-between py-6 lg:items-center flex-col lg:flex-row gap-6">
                    <p className="w-[80%] lg:w-2/3 whitespace-pre-line">
                      {item.description_service}
                    </p>
                    <div>
                      <Link
                        href={`${OUR_SERVICES}/${item.name_service}?id=${item.uuid}`}
                        className="btn btn-md lg:btn-lg rounded-badge bg-foreground text-primary hover:text-white"
                      >
                        Explore
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                  {status === "authenticated" && (
                    <div className="flex gap-4 w-full pl-10">
                      <button
                        onClick={async () => {
                          setIsOpen("status");
                          setSelectedService(item);
                          const modal = document.getElementById(
                            `my_modal_${item.uuid}`
                          ) as HTMLDialogElement;
                          if (modal) {
                            modal.showModal();
                          } else {
                            console.error("Modal element not found");
                          }
                        }}
                        className="tooltip tooltip-top"
                        data-tip={
                          item.status == StatusContent.draft
                            ? "Publish"
                            : "Unpublish"
                        }
                      >
                        <kbd
                          style={{
                            backgroundColor:
                              item.status == StatusContent.draft
                                ? "blue"
                                : "red",
                          }}
                          className="kbd"
                        >
                          <Upload
                            size={18}
                            color="white"
                            className={`${
                              item.status === StatusContent.publish
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </kbd>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(item);
                          const modal = document.getElementById(
                            "my_modal_2"
                          ) as HTMLDialogElement;
                          if (modal) {
                            modal.showModal();
                          } else {
                            console.error("Modal element not found");
                          }
                        }}
                        className="tooltip tooltip-top"
                        data-tip="Edit"
                      >
                        <kbd className="kbd">
                          <Pencil size={18} color="white" />
                        </kbd>
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen("delete");
                          setSelectedService(item);
                          const modal = document.getElementById(
                            `my_modal_${item.uuid}`
                          ) as HTMLDialogElement;
                          if (modal) {
                            modal.showModal();
                          } else {
                            console.error("Modal element not found");
                          }
                        }}
                        className="tooltip tooltip-top"
                        data-tip="Delete"
                      >
                        <kbd className="kbd">
                          <Trash2 size={18} color="white" />
                        </kbd>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
      </motion.section>

      {/* ###########################  section-form  ############################ */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        ref={sectionRefs.form}
        id="form"
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {visibleSections.form && <FormCustomer />}
      </motion.section>
      <ModalAddService />
      <ModalEditService data={selectedService} />
      {isOpen === "delete" && (
        <ModalConfirmAlert
          title="Delete Our Service"
          description={`Are you sure want to delete ${selectedService.name_service}?`}
          submitLabel="Delete"
          id={selectedService.uuid!}
          onSubmit={() => {
            mutate(selectedService.uuid!);
          }}
        />
      )}
      {isOpen === "status" && (
        <ModalConfirmAlert
          title={
            selectedService.status === StatusContent.publish
              ? "Unpublish"
              : "Publish"
          }
          description={`Are you sure want to ${
            selectedService.status === StatusContent.publish
              ? "unpublish"
              : "publish"
          } ${selectedService.name_service}?`}
          submitLabel={
            selectedService.status === StatusContent.publish
              ? "Unpublish"
              : "Publish"
          }
          id={selectedService.uuid!}
          onSubmit={() => {
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
            });
          }}
          color={
            selectedService.status === StatusContent.publish ? "red" : "blue"
          }
        />
      )}
    </>
  );
}
