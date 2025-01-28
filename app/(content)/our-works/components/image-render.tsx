"use client";
import React, { FC } from "react";
import Image from "next/image";
import { DefaultImage } from "@/public";

const ImageRender: FC<{ src: string }> = ({ src }) => {
  return (
    <>
      <Image
        priority
        src={src || DefaultImage.src}
        alt="picture-content"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw"
        className="object-cover"
        onError={(e) => {
          e.currentTarget.src = DefaultImage.src;
        }}
      />
    </>
  );
};

export default ImageRender;
