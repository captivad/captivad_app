"use client";

import React from "react";

interface IProps {
  value: (e: string) => void;
}
const ModalInputImage: React.FC<IProps> = ({ value }) => {
  const [imageUrl, setImageUrl] = React.useState("");

  return (
    <dialog id={`my_modal_add_image`} className="modal">
      <div className="modal-box">
        <h5 className="font-bold">Input Image</h5>
        <hr className="my-2" />
        <p className="py-4 text-sm">Please input your image url</p>
        <input
          type="text"
          placeholder="Eg: https://example.com/image.jpg"
          className="input input-bordered w-full max-w-xs"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button
              onClick={() => {
                value(imageUrl);
                setImageUrl("");
              }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
            <button
              onClick={() => {
                const modal = document.getElementById(
                  `my_modal_add_image`
                ) as HTMLDialogElement;
                modal?.close();
              }}
              type="button"
              className="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalInputImage;
