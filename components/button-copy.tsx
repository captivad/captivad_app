// components/CopyButton.tsx
"use client";

import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";

interface IProps {
  url: string;
}

const ButtonCopy = ({ url }: IProps) => {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard");
        })
        .catch((err) => {
          toast.error("Failed to copy link");
          console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="btn btn-md tooltip btn-circle absolute top-2 right-2 flex justify-center items-center z-20"
      data-tip="Copy Link"
    >
      <Copy size={20} />
    </button>
  );
};

export default ButtonCopy;
