"use client";

import { DefaultImage } from "@/public";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const VideoComponent = ({ url }: { url: string }) => {
  console.log(url);

  return (
    <div className="">
      <CldVideoPlayer
        width="1920"
        height="1080"
        src={url}
        fontFace="DM Sans"
        aspectRatio="16:9"
        onError={(e: any) => {
          e.currentTarget.src = DefaultImage.src;
        }}
      />
    </div>
  );
};

export default VideoComponent;
