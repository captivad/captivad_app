"use client";

import ModalEditWork from "@/app/(content)/our-works/components/ModalEditWork";
import { IOurWork } from "@/app/api/our-work/our-work.interface";
import { Pencil, Trash2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { FC } from "react";

interface IProps {
  data?: IOurWork;
}

const CardContentAction: FC<IProps> = ({ data }) => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <>
          <div className="absolute top-2 right-2 flex gap-2">
            {data?.status === "draft" && (
              <label
                onClick={() => {}}
                className="btn btn-md bg-blue-700 tooltip tooltip-bottom btn-circle flex justify-center items-center z-50"
                data-tip="Publish"
              >
                <Upload size={18} color="white" />
              </label>
            )}
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
              onClick={() => console.log("Download")}
              className="btn btn-md tooltip tooltip-bottom btn-circle flex justify-center items-center z-50"
              data-tip="Delete"
            >
              <Trash2 size={20} color="white" />
            </label>
          </div>
          {data && <ModalEditWork data={data as IOurWork} />}
        </>
      ) : null}
    </>
  );
};

export default CardContentAction;
