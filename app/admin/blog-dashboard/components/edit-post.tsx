"use client";

import MultiSelect from "@/components/multi-select";
import { MEDIA } from "@/utils/router";
import { ChevronLeft, Clipboard, Upload } from "lucide-react";
import TextEditor from "./text-editor";
import { FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const EditPost: FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const handlePasteClipboard = async (payload: string) => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      //   setFieldError(payload, "");
      //   setFieldValue(payload, clipboardText);
    }
  };
  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("action");
    params.delete("id");
    navigate.push(`?${params.toString()}`);
  };

  return (
    <form action="">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Title Article<span className="text-error">*</span>
            </label>
            <textarea
              id="title"
              name="title"
              placeholder="Enter your title here"
              className="input input-bordered w-full max-w-lg p-2 min-h-20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="author">
              Author<span className="text-error">*</span>
            </label>
            <input
              id="author"
              name="thumbnailUrl"
              type="text"
              placeholder="enter your author here"
              className={`input input-bordered max-w-lg`}
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
                className={`input input-bordered w-full`}
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
            <label htmlFor="thumbnailUrl">
              Category<span className="text-error">*</span>
            </label>
            <MultiSelect
              options={[]}
              placeholder="select relevant category"
              onChange={(selected) => {
                // setFieldValue(
                //   "serviceIds",
                //   selected.map((item) => item.value).join(",")
                // );
                // setValueSelectedService(selected);
              }}
              value={[]}
              // errors={
              //   errors.serviceIds && touched.serviceIds
              //     ? errors.serviceIds
              //     : ""
              // }
            />
          </div>
        </div>
      </div>
      <div className="h-full flex justify-start w-full flex-col gap-4">
        <div className="w-full flex justify-end">
          <label className="btn btn-md">Preview</label>
        </div>
        <TextEditor content="" onChange={() => {}} />
        <div className="w-full flex gap-4 justify-end">
          <label className="btn btn-primary">
            <span>
              <Upload size={16} />
            </span>
            Publish
          </label>
          <label className="btn btn-base-100 bg-foreground text-primary hover:text-white">
            Save to Draft
          </label>
          <label className="btn btn-md">Cencle</label>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
