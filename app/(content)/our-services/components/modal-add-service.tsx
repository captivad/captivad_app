"use client";
import { IPayloadCreateOurService } from "@/app/api/admin/our-services/our-service.interface";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { useCreateService } from "../our-service.web.service";
import toast from "react-hot-toast";
import { X } from "lucide-react";
interface IProps {
  refetch?: () => void;
}

const ModalAddService: FC<IProps> = ({ refetch }) => {
  const validationSchema = Yup.object().shape({
    nameService: Yup.string().required("Name service is required"),
    descriptionService: Yup.string().required(
      "Description service is required"
    ),
    detailTitle: Yup.string().required("Detail title service is required"),
    mainContatent: Yup.string().required("Main content service is required"),
  });

  const { mutate, isPending } = useCreateService({
    onSuccess: () => {
      refetch && refetch(); // Refetch data setelah sukses
      resetForm(); // Reset form setelah submit
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal?.close(); // Menutup modal
      toast.success("Add Our Service Success");
    },
  });

  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik<IPayloadCreateOurService>({
      initialValues: {
        nameService: "",
        descriptionService: "",
        detailTitle: "",
        mainContatent: "",
      } as IPayloadCreateOurService,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        mutate(values);
      },
    });

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between">
          <h3 className="font-bold">Add Our Service</h3>
          <button
            onClick={() => {
              resetForm();
              const modal = document.getElementById(
                "my_modal_1"
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
                errors.nameService && touched.nameService && "input-error"
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
                errors.descriptionService &&
                touched.descriptionService &&
                "textarea-error"
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
                errors.detailTitle && touched.detailTitle && "input-error"
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
                errors.mainContatent &&
                touched.mainContatent &&
                "textarea-error"
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

export default ModalAddService;
