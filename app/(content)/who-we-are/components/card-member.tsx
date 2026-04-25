"use client";
import { CldImage } from "next-cloudinary";
import { useDeleteMember, useGetMember } from "../who-we-are.web.service";
import { CompanyMember } from "@/prisma/prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ModalAddMember from "./modal-add-member";
import { useSession } from "next-auth/react";
import ModalEditMember from "./modal-edit-member";
import React from "react";
import ModalConfirmAlert from "@/components/modal-confirm";
import Image from "next/image";
import { DefaultImage } from "@/public";

const Cardmember: React.FC = () => {
  const { data, isLoading } = useGetMember();
  const { status } = useSession();
  const [selected, setSelected] = React.useState<CompanyMember>(
    {} as CompanyMember
  );

  const { mutate, isPending } = useDeleteMember();
  return (
    <>
      <div className="flex items-center gap-10 flex-wrap justify-center">
        {!isLoading &&
          data?.payload?.map((item: CompanyMember, index) => {
            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 lg:gap-10 group"
              >
                <div className="max-w-[400px] w-full aspect-square relative rounded-box overflow-hidden group cursor-pointer">
                  {/* IMAGE */}
                  <CldImage
                    width="1000"
                    height="1000"
                    src={item.image_url}
                    //   sizes="100vw"
                    alt={"profile-" + index}
                    onError={(e) => {
                      e.currentTarget.src = DefaultImage.src;
                    }}
                    className="
                      object-cover
                      grayscale
                      scale-100
                      transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                      group-hover:grayscale-0
                      group-hover:scale-110
                    "
                  />

                  {/* AI GRADIENT GLOW */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-tr from-cyan-500/0 via-blue-500/0 to-purple-500/0
                      group-hover:from-cyan-500/20
                      group-hover:via-blue-500/20
                      group-hover:to-purple-500/20
                      transition-all duration-700
                    "
                  />

                  {/* SCAN LINE EFFECT */}
                  <div
                    className="
                      absolute inset-0
                      opacity-0 group-hover:opacity-100
                      transition duration-700
                      before:content-['']
                      before:absolute before:inset-0
                      before:bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.2)_100%)]
                      before:bg-[length:100%_6px]
                      before:animate-[scan_2s_linear_infinite]
                    "
                  />

                  {/* GLOW BORDER */}
                  <div
                    className="
                      absolute inset-0 rounded-box
                      border border-transparent
                      group-hover:border-cyan-400/50
                      group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
                      transition-all duration-700
                    "
                  />
                </div>
                <div>
                  <h4 className="font-bold text-background text-white">
                    {item.fullname}
                  </h4>
                  <p className="text-background text-white">{item.position}</p>
                </div>
                <div className="flex gap-2 justify-end absolute top-4 right-4">
                  {status === "authenticated" && (
                    <>
                      <button
                        className="btn btn-square bg-green-700"
                        onClick={() => {
                          setSelected(item);
                          const modal = document.getElementById(
                            "my_modal_edit_member"
                          ) as HTMLDialogElement;
                          modal?.showModal();
                        }}
                      >
                        <Pencil size={20} className="text-foreground" />
                      </button>
                      <button
                        className="btn btn-square bg-red-700"
                        onClick={() => {
                          const modal = document.getElementById(
                            "my_modal_" + item.uuid
                          ) as HTMLDialogElement;
                          modal?.showModal();
                          setSelected(item);
                        }}
                      >
                        <Trash2 size={20} className="text-foreground" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        {isLoading && (
          <div className="flex gap-4 flex-wrap lg:gap-10 group justify-center">
            <div className="skeleton w-[400px] aspect-square relative rounded-box backdrop-blur-sm"></div>
            <div className="skeleton w-[400px] aspect-square relative rounded-box backdrop-blur-sm"></div>
            <div className="skeleton w-[400px] aspect-square relative rounded-box backdrop-blur-sm"></div>
          </div>
        )}
        {status === "authenticated" && (
          <button
            className="btn btn-square"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_add_member"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      <ModalAddMember />
      {selected && <ModalEditMember data={selected} />}
      {selected && (
        <ModalConfirmAlert
          id={selected.uuid}
          title={`Delete ${selected.fullname}`}
          description={`Are you sure want to delete ${selected.fullname}?`}
          onSubmit={() => mutate(selected.uuid)}
          submitLabel="Delete"
          isLoading={isPending}
        />
      )}
    </>
  );
};

export default Cardmember;
