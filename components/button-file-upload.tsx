"use client";

import { CloudUpload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function ButtonFileUpload() {
  return (
    <div>
      <CldUploadWidget
        uploadPreset={process.env.CLOUDINARY_UPLOAD_PRESET}
        options={{
          sources: ["local", "url", "camera"],
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className="btn btn-accent">
              <CloudUpload />
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
