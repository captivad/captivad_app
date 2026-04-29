"use client";

import ModalEditWork from "@/app/(content)/our-works/components/modal-edit-work";
import { Pencil, Trash2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { FC } from "react";
import {
  useDeleteOurWork,
  useEditStatusOurWork,
} from "@/app/(content)/our-works/our-work.web.service";
import toast from "react-hot-toast";
import { StatusContent } from "@/prisma/prisma/client";
import ModalConfirmAlert from "@/components/modal-confirm";
import { IPortfolio } from "../page";

interface IProps {
  data?: IPortfolio;
}

/**
 * Deteksi apakah URL adalah video berdasarkan ekstensi atau path Cloudinary.
 * Cloudinary video URL mengandung "/video/upload/" atau ekstensi video umum.
 */
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExts = /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i;
  const cloudinaryVideo = /\/video\/upload\//i;
  return videoExts.test(url) || cloudinaryVideo.test(url);
}

const CardContentAction: FC<IProps> = ({ data }) => {
  const { status } = useSession();

  const [isOpen, setIsOpen] = React.useState<string>("");
  const { mutate, isPending } = useDeleteOurWork({
    onSuccess: () => {
      toast.success("Deleted successfully!");
      const modal = document.getElementById(
        `my_modal_${data?.uuid}`
      ) as HTMLDialogElement;
      modal?.close();
    },
  });

  const { mutate: mutateStatus } = useEditStatusOurWork({
    onSuccess: () => {
      const modal = document.getElementById(
        `my_modal_${data?.uuid}`
      ) as HTMLDialogElement;
      modal?.close();
    },
  });

  const handleDelete = () => {
    mutate(data?.uuid || "");
  };

  return (
    <>
      {status === "authenticated" ? (
        <>
          <div
            className="absolute z-30 flex gap-2"
            style={{
              // Jika ada video badge di kiri atas, geser admin controls ke bawahnya
              top: isVideoUrl(data?.video_image_url || "")
                ? "2.75rem"
                : "1.25rem",
              left: "1.25rem",
              transition: "top 0.3s ease",
            }}
          >
            <label
              onClick={() => {
                setIsOpen("status");
                const modal = document.getElementById(
                  `my_modal_${data?.uuid}`
                ) as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                } else {
                  console.error("Modal element not found");
                }
              }}
              className="tooltip tooltip-top"
              data-tip={
                data?.status === StatusContent.draft ? "Publish" : "Unpublish"
              }
            >
              <kbd
                className="kbd"
                style={{
                  backgroundColor:
                    data?.status === StatusContent.draft
                      ? "rgba(59,130,246,0.3)"
                      : "rgba(239,68,68,0.3)",
                }}
              >
                <Upload
                  size={14}
                  color="white"
                  className={
                    data?.status === StatusContent.publish ? "rotate-180" : ""
                  }
                />
              </kbd>
            </label>
            <label
              onClick={() => {
                const modal = document.getElementById(
                  `my_modal_edit_work_${data?.uuid}`
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
                <Pencil size={14} color="white" />
              </kbd>
            </label>
            <label
              onClick={() => {
                setIsOpen("delete");
                const modal = document.getElementById(
                  `my_modal_${data?.uuid}`
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
                <Trash2 size={14} color="white" />
              </kbd>
            </label>
          </div>
          {data && <ModalEditWork data={data as IPortfolio} />}
          {data && isOpen === "delete" && (
            <ModalConfirmAlert
              id={data.uuid}
              onSubmit={handleDelete}
              title="Delete Portfolio"
              description="Are you sure you want to delete this portfolio?"
              submitLabel="Delete"
              isLoading={isPending}
            />
          )}
          {data && isOpen === "status" && (
            <ModalConfirmAlert
              id={data.uuid}
              onSubmit={() => mutateStatus(data.uuid)}
              title={
                data.status === StatusContent.draft
                  ? "Publish Portfolio"
                  : "Unpublish Portfolio"
              }
              description={
                data.status === StatusContent.draft
                  ? "Are you sure you want to publish this portfolio?"
                  : "Are you sure you want to unpublish this portfolio?"
              }
              submitLabel={
                data.status === StatusContent.draft ? "Publish" : "Unpublish"
              }
              isLoading={isPending}
              color={data.status === StatusContent.draft ? "blue" : "red"}
            />
          )}
        </>
      ) : null}
    </>
  );
};

export default CardContentAction;
