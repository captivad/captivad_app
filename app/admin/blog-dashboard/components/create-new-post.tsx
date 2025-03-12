"use client";

import MultiSelect from "@/components/multi-select";
import { MEDIA } from "@/utils/router";
import { ChevronLeft, Clipboard, Plus, Upload } from "lucide-react";
import TextEditor from "./text-editor";
import { FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import {
  IPayloadCreatePost,
  IPayloadCreatePostFormik,
} from "@/app/api/admin/blog-dashboard/blog-dashboard.interface";
import { StatusContent } from "@/prisma/prisma/client";
import * as Yup from "yup";
import {
  useCreateCategory,
  useCreatePostDashboard,
  useGetCategoryDashboard,
} from "../blog-dashboard.service";
import React from "react";
import ModalConfirmAlert from "@/components/modal-confirm";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  mainContent: Yup.string()
    .required("Main content is required")
    .test(
      "not-empty-paragraph",
      "Main content cannot be empty",
      (value) => value !== "<p></p>" // Validasi tambahan untuk memastikan tidak sama dengan <p></p>
    ),
  thumbnailUrl: Yup.string().required("Thumbnail is required"),
  status: Yup.string().required("Status is required"),
  optionalContent: Yup.string().nullable(),
});

const ModalAddCategory: FC = () => {
  const { mutate, isPending, isSuccess } = useCreateCategory();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("name") as string;
    const description = formData.get("description") as string;
    mutate({
      name: title,
      description,
    });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setName("");
      setDescription("");
    }
  }, [isSuccess]);
  return (
    <>
      <dialog id="my_modal_add_category" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Category</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Type title category"
              className="input input-bordered "
            />
            <input
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Type description"
              className="input input-bordered "
            />
            <button
              disabled={isPending || !name || !description}
              className="btn btn-primary"
            >
              {isPending ? "Processing..." : "Save"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

const CreateNewPost: FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handleBack = () => {
    params.delete("action");
    navigate.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      localStorage.removeItem("editorContent");
    }
  };

  //list category options
  const { data: listCategory } = useGetCategoryDashboard();
  const categoryOptions = React.useMemo(() => {
    if (!listCategory) return [];
    return listCategory?.map((item, _i) => ({
      id: _i,
      value: String(item.id),
      label: item.name,
    }));
  }, [listCategory]);

  const { mutate, isPending } = useCreatePostDashboard();

  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    resetForm,
  } = useFormik<IPayloadCreatePostFormik>({
    initialValues: {
      title: "",
      author: "",
      mainContent: "",
      thumbnailUrl: "",
      categoryIds: [],
      status: StatusContent.draft,
      optionalContent: "",
    },
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  const handlePasteClipboard = async (payload: string) => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      setFieldError(payload, "");
      setFieldValue(payload, clipboardText);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center mb-5">
          <label onClick={handleBack} className="btn btn-square rounded-full">
            <ChevronLeft size={25} />
          </label>
          <h5 className="font-bold flex items-center gap-2 text-white">
            Add New Post
          </h5>
        </div>

        <div className="flex justify-between">
          <div className="mb-10 flex gap-4 flex-col w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                Title Article<span className="text-error">*</span>
              </label>
              <textarea
                id="title"
                name="title"
                placeholder="Enter your title here"
                onChange={handleChange}
                value={values.title}
                className={`input input-bordered w-full max-w-lg p-2 min-h-20 ${
                  errors.title && touched.title && "input-error"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="author">
                Author<span className="text-error">*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="enter your author here"
                onChange={handleChange}
                value={values.author}
                className={`input input-bordered max-w-lg ${
                  errors.author && touched.author && "input-error"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnailUrl">
                Thumbnail URL<span className="text-error">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  type="text"
                  placeholder="Eg: https://example.com/image.jpg"
                  onChange={handleChange}
                  value={values.thumbnailUrl}
                  className={`input input-bordered w-full ${
                    errors.thumbnailUrl && touched.thumbnailUrl && "input-error"
                  }`}
                />
                <label
                  onClick={() => handlePasteClipboard("thumbnailUrl")}
                  className="btn btn-square tooltip tooltip-bottom flex justify-center items-center"
                  data-tip="Paste from clipboard"
                >
                  <Clipboard size={20} />
                </label>
                <Link href={MEDIA} target="_blank" className="btn btn-primary">
                  Open Galery
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnailUrl">Category</label>
              <div className="flex gap-4 items-center">
                <MultiSelect
                  options={categoryOptions}
                  placeholder="select relevant category"
                  onChange={(selected) => {
                    setFieldValue("categoryIds", selected);
                  }}
                  value={values.categoryIds}
                />
                <label
                  htmlFor=""
                  className="btn btn-square"
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_add_category"
                    ) as HTMLDialogElement;
                    if (modal) modal.showModal();
                  }}
                >
                  <Plus />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex justify-start w-full flex-col gap-4">
          <div className="w-full flex justify-between items-end">
            {errors.mainContent && (
              <label className="text-error">{errors.mainContent}</label>
            )}
            {/* <label className="btn btn-md">Preview</label> */}
          </div>
          <TextEditor
            contentHtml={values.mainContent}
            onChange={(e) => {
              setFieldValue("mainContent", e);
            }}
          />
          <div className="w-full flex gap-4 justify-end">
            <button
              onClick={() => {
                setFieldValue("status", StatusContent.publish);
                if (
                  !errors.author &&
                  !errors.title &&
                  !errors.mainContent &&
                  !errors.thumbnailUrl &&
                  !errors.status
                ) {
                  const modal = document.getElementById(
                    "my_modal_create-publish"
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }
              }}
              className="btn bg-green-700 text-foreground"
            >
              <span>
                <Upload size={16} />
              </span>
              Publish
            </button>
            <button
              onClick={() => {
                setFieldValue("status", StatusContent.draft);
                if (
                  !errors.author &&
                  !errors.title &&
                  !errors.mainContent &&
                  !errors.thumbnailUrl &&
                  !errors.status
                ) {
                  const modal = document.getElementById(
                    "my_modal_save-draft"
                  ) as HTMLDialogElement;
                  modal?.showModal();
                }
              }}
              className="btn btn-base-100 bg-foreground text-primary hover:text-white"
            >
              Save to Draft
            </button>
            <label onClick={handleBack} className="btn btn-md">
              Cencle
            </label>
          </div>
        </div>
      </form>
      <ModalConfirmAlert
        title="Publish Post"
        description="Are you sure you want to publish this post?"
        submitLabel="Publish"
        id={"create-publish" as string}
        onSubmit={() => {
          const payload: IPayloadCreatePost = {
            ...values,
            categoryIds: values.categoryIds.map((item) => item.value).join(","),
          };
          mutate(payload);
          resetForm();
        }}
        color="#17803d"
        isLoading={isPending}
      />
      <ModalConfirmAlert
        title="Save to Draft"
        description="Content will be saved to draft"
        submitLabel="Save"
        id={"save-draft" as string}
        onSubmit={() => {
          const payload: IPayloadCreatePost = {
            ...values,
            categoryIds: values.categoryIds.map((item) => item.value).join(","),
          };
          console.log(payload, "payload");

          mutate(payload);
          resetForm();
        }}
        isLoading={isPending}
        color="#17803d"
      />
      <ModalAddCategory />
    </>
  );
};

export default CreateNewPost;
