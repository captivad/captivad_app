"use client";

import { IBlogContent } from "@/app/(content)/blog/blog.interface";
import { Blog } from "@/prisma/prisma/client";
import { dateRange, textLimit } from "@/utils/general";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";

interface IProps {
  className?: string;
  content: Blog;
  type?: "content" | "preview";
}
const CardBlog: React.FC<IProps> = ({ className, content, type }) => {
  // Parse the HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content.main_content, "text/html");

  // Extract only the text content
  const textContent = (doc as any).body.textContent.trim();

  switch (type) {
    case "preview":
      return (
        <div
          className={`group card shadow-xl hover:scale-95 duration-300 hover:shadow-sm hover:shadow-white ${className}`}
        >
          <figure>
            <CldImage
              priority
              width={500}
              height={500}
              className="w-full h-full object-cover"
              src={content.thumbnail_url}
              alt={content.title}
            />
          </figure>
          <div className="card-body px-4">
            <h4 className="font-semibold mb-2">{content.title}</h4>
            <h6 className="">
              {textLimit({
                text: textContent || "",
                limit: 50,
              })}
            </h6>
            <p className="text-sm">
              CaptivAd Team . {dateRange({ createdDt: content.created_dt })}
            </p>
          </div>
        </div>
      );
    default:
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
              src={content.thumbnail_url}
              alt={content.title}
            />
          </figure>
          <div className="card-body px-4">
            <h4 className="font-semibold mb-2">{content.title}</h4>
            <h6 className="">
              {textLimit({
                text: textContent,
                limit: 50,
              })}
            </h6>
            <p className="text-sm">
              CaptivAd Team . {dateRange({ createdDt: content.created_dt })}
            </p>
          </div>
        </Link>
      );
  }
};

export default CardBlog;
