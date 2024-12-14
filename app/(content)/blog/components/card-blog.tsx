"use client";

import { IBlogContent } from "@/app/(content)/blog/blog.interface";
import { dateRange, textLimit } from "@/utils/general";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";

interface IProps {
  className?: string;
  content: IBlogContent;
}
const CardBlog: React.FC<IProps> = ({ className, content }) => {
  return (
    <Link
      href={`/blog/${content.title}?id=${content.uuid}`}
      className={`group card shadow-xl hover:scale-95 duration-300 hover:shadow-sm hover:shadow-white ${className}`}
    >
      <figure>
        <CldImage
          priority
          width={500}
          height={500}
          className="w-full h-full object-cover"
          src={content.imageUrl}
          alt={content.title}
        />
      </figure>
      <div className="card-body px-4">
        <h4 className="font-semibold mb-2">{content.title}</h4>
        <h6 className="">
          {textLimit({
            text: content.content,
            limit: 50,
          })}
        </h6>
        <p className="text-sm">
          CaptivAd Team . {dateRange({ createdDt: content.createdDt })}
        </p>
      </div>
    </Link>
  );
};

export default CardBlog;
