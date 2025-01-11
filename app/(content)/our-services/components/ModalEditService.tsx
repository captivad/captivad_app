"use client";
import {
  IPayloadCreateOurService,
  IPayloadUpdateOurService,
} from "@/app/api/admin/our-services/our-service.interface";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { useEditService } from "../our-service.web.service";
import React from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { IListGetService } from "@/app/api/our-services/our-service.interface";
interface IProps {
  refetch?: () => void;
  data: IListGetService;
}
const ModalEditService: FC<IProps> = ({ refetch, data }) => {
  const validationSchema = Yup.object().shape({
    nameService: Yup.string().required("Name service is required"),
    descriptionService: Yup.string().required(
      "Description service is required"
    ),
    detailTitle: Yup.string().required("Detail title service is required"),
    mainContatent: Yup.string().required("Main content service is required"),
  });

  const { mutate, isPending } = useEditService({
    onSuccess: () => {
      refetch && refetch(); // Refetch data setelah sukses
      resetForm(); // Reset form setelah submit
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal?.close(); // Menutup modal
      toast.success("Edit Our Service Success");
    },
  });

  const { handleSubmit, handleChange, values, errors, resetForm, setValues } =
    useFormik<IPayloadUpdateOurService>({
      initialValues: {
        nameService: data.name_service,
        descriptionService: data.description_service,
        detailTitle: data.detail_title,
        mainContatent: data.main_content,
        status: data.status,
      } as IPayloadUpdateOurService,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        mutate({
          payload: values,
          id: data.uuid,
        });
      },
    });

  React.useEffect(() => {
    setValues({
      nameService: data.name_service,
      descriptionService: data.description_service,
      detailTitle: data.detail_title,
      mainContatent: data.main_content,
      status: data.status,
    });
  }, [data, setValues]);

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between">
          <h3 className="font-bold">Edit Our Service</h3>
          <button
            onClick={() => {
              resetForm();
              const modal = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement;
              modal?.close();
            }}
            data-tip="Publish"
          >
            <kbd className="kbd kbd-">
              <X size={18} />
            </kbd>
          </button>
        </div>
        <div className="divider"></div>
        <p className="py-2 text-sm font-semibold">
          Complate the form to add a new service
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Name Service<span className="text-error">*</span>
              </span>
            </label>
            <input
              name="nameService"
              type="text"
              placeholder="enter name service"
              className={`input input-bordered w-full ${
                errors.nameService && "input-error"
              }`}
              onChange={handleChange}
              value={values.nameService}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Description<span className="text-error">*</span>
              </span>
            </label>
            <textarea
              name="descriptionService"
              className={`textarea textarea-bordered w-full ${
                errors.descriptionService && "textarea-error"
              }`}
              placeholder="enter description service"
              onChange={handleChange}
              value={values.descriptionService}
            ></textarea>
          </div>
          <div className="divider">Detail of Service</div>
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Detail Name Service<span className="text-error">*</span>
              </span>
            </label>
            <input
              name="detailTitle"
              type="text"
              placeholder="enter detail name service"
              className={`input input-bordered w-full ${
                errors.detailTitle && "input-error"
              }`}
              onChange={handleChange}
              value={values.detailTitle}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Main Content Service <span className="text-error">*</span>
              </span>
            </label>
            <textarea
              name="mainContatent"
              className={`textarea textarea-bordered w-full ${
                errors.mainContatent && "textarea-error"
              }`}
              placeholder="enter main content service"
              onChange={handleChange}
              value={values.mainContatent}
            ></textarea>
          </div>
          <div className="w-full flex justify-center gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn bg-foreground text-primary hover:text-white w-1/4"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalEditService;
