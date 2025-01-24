"use client";

import MultiSelect from "@/components/multi-select";
import { MEDIA } from "@/utils/router";
import { ChevronLeft, Clipboard, Upload } from "lucide-react";
import TextEditor from "./text-editor";
import { FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import {
  IPayloadEditPost,
  IPayloadUpdatePostFormik,
  IPostCategory,
} from "@/app/api/admin/blog-dashboard/blog-dashboard.interface";
import React from "react";
import {
  useDeletePostDashboard,
  useGetCategoryDashboard,
  useGetDetailPostId,
  useUpdatePostDashboard,
} from "../blog-dashboard.service";
import { StatusContent } from "@/prisma/prisma/client";
import * as Yup from "yup";
import ModalConfirmAlert from "@/components/modal-confirm";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  mainContent: Yup.string().required("Main content is required"),
  thumbnailUrl: Yup.string().required("Thumbnail is required"),
  status: Yup.string().required("Status is required"),
  optionalContent: Yup.string().nullable(),
});

const EditPost: FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = params.get("id");

  const handleBack = () => {
    params.delete("action");
    params.delete("id");
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

  const { mutate: updatemutate, isPending: isPendingUpdate } =
    useUpdatePostDashboard(id as string);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setValues,
  } = useFormik<IPayloadUpdatePostFormik>({
    initialValues: {
      title: "",
      author: "",
      thumbnailUrl: "",
      mainContent: "",
      optionalContent: "",
      status: "draft",
      categoryIds: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const payload: IPayloadEditPost = {
        ...values,
        categoryIds: values.categoryIds.map((item) => item.value).join(","),
      };
      updatemutate(payload);
    },
  });

  const { mutate: deletepostMutate, isPending: isPendingDelete } =
    useDeletePostDashboard({
      onSuccess: () => {
        params.delete("search");
        params.delete("action");
        params.delete("id");
        navigate.push(`?${params.toString()}`);
      },
    });

  const handlePasteClipboard = async (payload: string) => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      setFieldError(payload, "");
      setFieldValue(payload, clipboardText);
    }
  };

  const { data: detailPost } = useGetDetailPostId(id as string);

  React.useEffect(() => {
    if (detailPost) {
      setValues((prev) => ({
        ...prev,
        title: detailPost.title,
        author: detailPost.author,
        thumbnailUrl: detailPost.thumbnailUrl,
        mainContent: detailPost.mainContent,
        optionalContent: detailPost.optionalContent,
        status: detailPost.status,
        categoryIds: detailPost.categories.map(
          (item: IPostCategory, _i: number) => ({
            id: _i,
            value: String(item.id),
            label: item.name,
          })
        ),
      }));
    }
  }, [detailPost, id, setValues]);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center mb-5">
          <label onClick={handleBack} className="btn btn-square rounded-full">
            <ChevronLeft size={25} />
          </label>
          <h5 className="font-bold flex items-center gap-2 text-white">
            Edit Post
          </h5>
        </div>

        <div className="flex justify-between">
          <div className="mb-10 flex gap-4 flex-col w-full">
            <div
              className="badge badge-lg font-bold min-w-20 text-foreground"
              style={{
                backgroundColor:
                  detailPost?.status == StatusContent.publish
                    ? "#22c55e"
                    : "#3b82f6",
              }}
            >
              {detailPost?.status}
            </div>
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
              <label htmlFor="category">Category</label>
              <MultiSelect
                options={categoryOptions}
                placeholder="select relevant category"
                onChange={(selected) => {
                  setFieldValue("categoryIds", selected);
                }}
                value={values.categoryIds}
              />
            </div>
          </div>
        </div>
        <div className="h-full flex justify-start w-full flex-col gap-4">
          <div className="w-full flex justify-between items-end">
            {errors.mainContent && (
              <label className="text-error">{errors.mainContent}</label>
            )}
            <label className="btn btn-md">Preview</label>
          </div>
          <TextEditor
            contentHtml={values.mainContent}
            onChange={(e) => {
              setFieldValue("mainContent", e);
            }}
          />
          <div className="w-full flex gap-4 justify-end">
            <label
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_delete_" + id
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
              className="btn bg-red-700 text-white"
            >
              Delete Post
            </label>
            <label
              onClick={() => {
                setFieldValue(
                  "status",
                  detailPost?.status == StatusContent.publish
                    ? StatusContent.draft
                    : StatusContent.publish
                );
                const modal = document.getElementById(
                  "my_modal_status_" + id
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
              className={`btn ${
                detailPost?.status == StatusContent.publish
                  ? "bg-red-700"
                  : "bg-green-700"
              } text-white`}
            >
              <span>
                <Upload
                  size={16}
                  style={{
                    rotate:
                      detailPost?.status == StatusContent.publish
                        ? "180deg"
                        : "0deg",
                  }}
                />
              </span>
              {detailPost?.status == StatusContent.publish
                ? "Unpublish"
                : "Publish"}
            </label>
            <label
              onClick={() => {
                setFieldValue("status", detailPost?.status);
                const modal = document.getElementById(
                  "my_modal_save_" + id
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
              className="btn min-w-32 btn-base-100 bg-foreground text-background hover:text-white"
            >
              Save
            </label>
            <label onClick={handleBack} className="btn btn-md">
              Cencle
            </label>
          </div>
        </div>
      </form>
      <ModalConfirmAlert
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        submitLabel="Delete"
        id={("delete_" + id) as string}
        onSubmit={() => deletepostMutate(id as string)}
        isLoading={isPendingDelete}
      />
      <ModalConfirmAlert
        title={
          detailPost?.status == StatusContent.publish
            ? "Unpublish Post"
            : "Publish Post"
        }
        description={
          detailPost?.status == StatusContent.publish
            ? "Are you sure you want to unpublish this post?"
            : "Are you sure you want to publish this post?"
        }
        submitLabel={
          detailPost?.status == StatusContent.publish ? "Unpublish" : "Publish"
        }
        id={("status_" + id) as string}
        onSubmit={() => {
          const payload: IPayloadEditPost = {
            ...values,
            categoryIds: values.categoryIds.map((item) => item.value).join(","),
          };
          updatemutate(payload);
        }}
        color={
          detailPost?.status == StatusContent.publish ? "#ba1c1c" : "#17803d"
        }
        isLoading={isPendingUpdate}
      />
      <ModalConfirmAlert
        title="Save this post?"
        description="Are you sure you want to save this post?"
        submitLabel="Save"
        color="#17803d"
        id={("save_" + id) as string}
        onSubmit={() => {
          const payload: IPayloadEditPost = {
            ...values,
            categoryIds: values.categoryIds.map((item) => item.value).join(","),
          };
          updatemutate(payload);
        }}
        isLoading={isPendingUpdate}
      />
    </>
  );
};

export default EditPost;
