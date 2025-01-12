"use client";

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
      />
    </div>
  );
};

export default VideoComponent;
