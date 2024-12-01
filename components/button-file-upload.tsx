"use client";

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
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </div>
  );
}
