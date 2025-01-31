import { IPayloadAddCompanyMember } from "@/app/api/admin/company-member/comapny-member.interface";
import { MEDIA } from "@/utils/router";
import { useFormik } from "formik";
import { X, Clipboard } from "lucide-react";
import * as Yup from "yup";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useAddMember } from "../who-we-are.web.service";

const ModalAddMember: React.FC = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    imageUrl: Yup.string().url().required("Image is required"),
    position: Yup.string().required("Position is required"),
  });

  const { mutate, isPending } = useAddMember({
    onSuccess() {
      resetForm();
    },
  });

  const {
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    values,
    touched,
    setFieldError,
    setFieldValue,
  } = useFormik<IPayloadAddCompanyMember>({
    initialValues: {
      fullname: "",
      imageUrl: "",
      position: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handlePasteClipboard = async (payload: string) => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      setFieldError(payload, "");
      setFieldValue(payload, clipboardText);
    }
  };
  return (
    <dialog id="my_modal_add_member" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <div className="flex justify-between">
          <h3 className="font-bold">Company Member</h3>
          <button
            onClick={() => {
              resetForm();
              const modal = document.getElementById(
                "my_modal_add_member"
              ) as HTMLDialogElement;
              modal?.close();
            }}
          >
            <kbd className="kbd kbd-">
              <X size={18} />
            </kbd>
          </button>
        </div>
        <div className="divider"></div>
        <p className="py-2 text-sm font-semibold">
          Complate the form to add a company member
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Fullname<span className="text-error">*</span>
              </span>
            </label>
            <input
              name="fullname"
              type="text"
              placeholder="enter name fullname"
              className={`input input-bordered w-full ${
                errors.fullname && touched.fullname && "input-error"
              }`}
              onChange={handleChange}
              value={values.fullname}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Image Profile Url<span className="text-error">*</span>
              </span>
            </label>
            <div className="flex gap-4">
              <input
                name="imageUrl"
                type="text"
                placeholder="Ex: https://example.com/image.jpg"
                className={`input input-bordered w-full ${
                  errors.imageUrl && touched.imageUrl && "input-error"
                }`}
                onChange={handleChange}
                value={values.imageUrl}
              />
              <label
                onClick={() => handlePasteClipboard("imageUrl")}
                className="btn btn-square btn-outline tooltip tooltip-bottom flex justify-center items-center"
                data-tip="Paste from clipboard"
              >
                <Clipboard size={20} />
              </label>
              <Link href={MEDIA} className="btn btn-primary" target="_blank">
                Galery
              </Link>
            </div>
            <div className=" max-w-[400px] mt-4">
              {values.imageUrl && !errors.imageUrl && (
                <CldImage
                  className="object-cover mt-2"
                  width="960"
                  height="600"
                  src={values.imageUrl}
                  sizes="100vw"
                  alt={values.imageUrl}
                  onError={() => {
                    console.log("error");
                    setFieldError(
                      "imageUrl",
                      "URL is not valid, please enter a valid URL."
                    );
                  }}
                  loading="lazy"
                />
              )}
              {errors.imageUrl && (
                <p className="text-error text-sm mt-2">{errors.imageUrl}</p>
              )}
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text text-foreground font-bold">
                Position<span className="text-error">*</span>
              </span>
            </label>
            <input
              name="position"
              type="text"
              placeholder="enter name position"
              className={`input input-bordered w-full ${
                errors.position && touched.position && "input-error"
              }`}
              onChange={handleChange}
              value={values.position}
            />
          </div>

          <div className="w-full flex gap-4 justify-end">
            <button
              type="submit"
              className="btn min-w-36 bg-white text-background hover:text-foreground"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
            <label
              onClick={() => {
                resetForm();
                const modal = document.getElementById(
                  "my_modal_add_member"
                ) as HTMLDialogElement;
                modal?.close();
              }}
              className="btn"
            >
              Cancel
            </label>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalAddMember;
