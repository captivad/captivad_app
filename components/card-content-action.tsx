"use client";

import ModalEditWork from "@/app/(content)/our-works/components/ModalEditWork";
import { IOurWork } from "@/app/api/our-work/our-work.interface";
import { Pencil, Trash2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { FC } from "react";
import ModalConfirmAlert from "./modal-confirm";
import {
  useDeleteOurWork,
  useEditStatusOurWork,
} from "@/app/(content)/our-works/our-work.web.service";
import toast from "react-hot-toast";
import { StatusContent } from "@/prisma/prisma/client";

interface IProps {
  data?: IOurWork;
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
          <div className="absolute top-2 right-2 flex gap-2">
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
              style={{
                backgroundColor:
                  data?.status === StatusContent.draft ? "blue" : "red",
              }}
              className="btn btn-md tooltip tooltip-bottom btn-circle flex justify-center items-center z-50"
              data-tip={
                data?.status === StatusContent.draft ? "Publish" : "Unpublish"
              }
            >
              <Upload
                size={18}
                color="white"
                className={`${
                  data?.status === StatusContent.publish ? "rotate-180" : ""
                }`}
              />
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
              className="btn btn-md tooltip tooltip-bottom btn-circle flex justify-center items-center z-50"
              data-tip="Edit"
            >
              <Pencil size={20} color="white" />
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
              className="btn btn-md tooltip tooltip-bottom btn-circle flex justify-center items-center z-50"
              data-tip="Delete"
            >
              <Trash2 size={20} color="white" />
            </label>
          </div>
          {data && <ModalEditWork data={data as IOurWork} />}
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
