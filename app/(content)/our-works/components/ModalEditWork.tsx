"use client";

import { useFormik } from "formik";
import { FC, useMemo } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Clipboard, X } from "lucide-react";
import {
  useCreateService,
  useGetListService,
} from "../../our-services/our-service.web.service";
import { useCreateOurWork, useGetCategory } from "../our-work.web.service";
import { IPayloadCreateOurWork } from "@/app/api/admin/our-work/our-work.interface";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import Link from "next/link";
import { MEDIA } from "@/utils/router";
import MultiSelect, { IMultiselectOption } from "@/components/multi-select";
import React from "react";
import { IOurWork } from "@/app/api/our-work/our-work.interface";
interface IProps {
  refetch?: () => void;
  data: IOurWork;
}

const ModalEditWork: FC<IProps> = ({ refetch, data }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    objective: Yup.string().required("Objective is required"),
    keyResult: Yup.string().required("Key Result is required"),
    thumbnailUrl: Yup.string().url().required("Thumbnail is required"),
    videoImageUrl: Yup.string().url().required("Video is required"),
    serviceIds: Yup.string().required("Service is required"),
    categoryIds: Yup.string().required("Category is required"),
  });

  //list service options
  const { data: listService } = useGetListService();
  const serviceOptions = React.useMemo(() => {
    if (!listService) return [];
    return listService?.map((item, _i) => ({
      id: _i,
      value: item.uuid,
      label: item.name_service,
    }));
  }, [listService]);

  //list category options
  const { data: listCategory } = useGetCategory();
  const categoryOptions = React.useMemo(() => {
    if (!listCategory) return [];
    return listCategory?.map((item, _i) => ({
      id: _i,
      value: String(item.id),
      label: item.name,
    }));
  }, [listCategory]);

  const { mutate, isPending } = useCreateOurWork({
    onSuccess: () => {
      refetch && refetch(); // Refetch data setelah sukses
      resetForm(); // Reset form setelah submit
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal?.close(); // Menutup modal
      toast.success("Add Our Service Success");
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues,
  } = useFormik<IPayloadCreateOurWork>({
    initialValues: {
      title: "",
      description: "",
      objective: "",
      keyResult: "",
      thumbnailUrl: "",
      videoImageUrl: "",
      serviceIds: "",
      categoryIds: "",
    },
    validationSchema: validationSchema,
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

  React.useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        description: data.description,
        objective: data.objectiv_content,
        keyResult: data.key_result_content,
        thumbnailUrl: data.thumbnail_url,
        videoImageUrl: data.video_image_url,
        serviceIds: "",
        categoryIds: "",
      });
    }
  }, [data]);
  return (
    <dialog id={`my_modal_edit_work_${data.uuid}`} className="modal">
      <div className="modal-box w-11/12 max-w-7xl">
        <div className="flex justify-between">
          <h3 className="font-bold">Add Porfolio</h3>
          <button
            onClick={() => {
              resetForm();
              const modal = document.getElementById(
                `my_modal_edit_work_${data.uuid}`
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
        <span className="flex justify-between">
          <p className="py-2 text-sm font-semibold ">
            Complate the form to add a new service
          </p>
          <Link
            href={MEDIA}
            className="font-bold hover:text-blue-600 pr-4"
            target="_blank"
          >
            Open Galery
          </Link>
        </span>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex xl:flex-row flex-col w-full">
            <div className="card bg-base-300 rounded-box w-full p-10 flex flex-col gap-2">
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Porfolio Title<span className="text-error">*</span>
                  </span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="enter title"
                  className={`input input-bordered w-full ${
                    errors.title && touched.title && "input-error"
                  }`}
                  onChange={handleChange}
                  value={values.title}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Description<span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  name="description"
                  className={`textarea textarea-bordered w-full ${
                    errors.description &&
                    touched.description &&
                    "textarea-error"
                  }`}
                  placeholder="enter description"
                  onChange={handleChange}
                  value={values.description}
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Objective of Portfolio<span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  name="objective"
                  className={`textarea textarea-bordered w-full ${
                    errors.objective && touched.objective && "textarea-error"
                  }`}
                  placeholder="enter objective of portfolio"
                  onChange={handleChange}
                  value={values.objective}
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Key Result <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  name="keyResult"
                  className={`textarea textarea-bordered w-full ${
                    errors.keyResult && touched.keyResult && "textarea-error"
                  }`}
                  placeholder="enter main content service"
                  onChange={handleChange}
                  value={values.keyResult}
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Category
                  </span>
                </label>
                <MultiSelect
                  options={categoryOptions}
                  placeholder="select category"
                  onChange={(selected) => {
                    setFieldValue(
                      "categoryIds",
                      selected.map((item) => item.value).join(",")
                    );
                  }}
                  errors={
                    errors.categoryIds && touched.categoryIds
                      ? errors.categoryIds
                      : ""
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Profolion relate service
                  </span>
                </label>
                <MultiSelect
                  options={serviceOptions as IMultiselectOption[]}
                  placeholder="select service"
                  onChange={(selected) => {
                    setFieldValue(
                      "serviceIds",
                      selected.map((item) => item.value).join(",")
                    );
                  }}
                  errors={
                    errors.serviceIds && touched.serviceIds
                      ? errors.serviceIds
                      : ""
                  }
                />
              </div>
            </div>

            <div className="divider divider-horizontal"></div>

            <div className="card bg-base-300 rounded-box w-full p-10 flex flex-col gap-2">
              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Tumbnail URL <span className="text-error">*</span>
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    name="thumbnailUrl"
                    type="text"
                    placeholder="enter URL"
                    className={`input input-bordered w-full ${
                      errors.thumbnailUrl &&
                      touched.thumbnailUrl &&
                      "input-error"
                    }`}
                    onChange={handleChange}
                    value={values.thumbnailUrl}
                  />
                  <label
                    onClick={() => handlePasteClipboard("thumbnailUrl")}
                    className="btn btn-square btn-primary tooltip tooltip-bottom flex justify-center items-center"
                    data-tip="Paste from clipboard"
                  >
                    <Clipboard size={20} />
                  </label>
                </div>
                <div className=" max-w-lg">
                  {values.thumbnailUrl && !errors.thumbnailUrl && (
                    <CldImage
                      className="object-cover mt-2"
                      width="960"
                      height="600"
                      src={values.thumbnailUrl}
                      sizes="100vw"
                      alt=""
                      onError={() => {
                        console.log("error");
                        setFieldError(
                          "thumbnailUrl",
                          "URL is not valid, please enter a valid URL."
                        );
                      }}
                    />
                  )}
                  {errors.thumbnailUrl && (
                    <p className="text-error text-sm mt-2">
                      {errors.thumbnailUrl}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-foreground font-bold">
                    Image or Video URL <span className="text-error">*</span>
                  </span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    name="videoImageUrl"
                    type="text"
                    placeholder="enter URL"
                    className={`input input-bordered w-full ${
                      errors.videoImageUrl &&
                      touched.videoImageUrl &&
                      "input-error"
                    }`}
                    onChange={handleChange}
                    value={values.videoImageUrl}
                  />
                  <label
                    onClick={() => {
                      setFieldValue("videoImageUrl", "");
                      handlePasteClipboard("videoImageUrl");
                    }}
                    className="btn btn-square btn-primary tooltip tooltip-bottom flex items-center justify-center"
                    data-tip="Paste from clipboard"
                  >
                    <Clipboard size={20} />
                  </label>
                </div>
                <div className="overflow-hidden grid grid-cols-1">
                  {values.videoImageUrl &&
                  !errors.videoImageUrl &&
                  values.videoImageUrl.includes("image") ? (
                    <div className="col-span-1">
                      <CldImage
                        className="object-cover mt-2"
                        width="960"
                        height="600"
                        src={values.videoImageUrl}
                        onError={() => {
                          console.log("error");
                          setFieldError(
                            "videoImageUrl",
                            "URL is not valid, please enter a valid URL."
                          );
                        }}
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  ) : values.videoImageUrl &&
                    values.videoImageUrl.includes("video") &&
                    !errors.videoImageUrl ? (
                    <div className="col-span-1 w-[300px] scale-50">
                      <CldVideoPlayer
                        width="1920"
                        height="1080"
                        src={values.videoImageUrl}
                        fontFace="DM Sans"
                      />
                    </div>
                  ) : null}
                </div>

                {errors.videoImageUrl && (
                  <p className="text-error text-sm mt-2">
                    {errors.videoImageUrl}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center gap-4 mt-10">
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

export default ModalEditWork;
