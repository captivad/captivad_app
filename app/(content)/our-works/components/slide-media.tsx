import { extractCloudinaryPublicId, isVideoUrl } from "../utils/our-work-utils";
import Image from "next/image";

/**
 * SlideMedia
 *
 * Menentukan apakah `video_image_url` adalah video atau gambar,
 * lalu merender komponen yang sesuai:
 * - Video → CldVideoPlayer, autoplay muted loop, kontrol custom
 * - Image → next/image fill object-cover
 *
 * isActive: false saat slide tidak aktif → video di-pause otomatis
 */
function SlideMedia({
  url,
  fallbackUrl,
  alt,
  isActive,
}: {
  url: string;
  fallbackUrl: string;
  alt: string;
  isActive: boolean;
}) {
  const isVideo = isVideoUrl(url);

  // Vignette overlay yang sama untuk image maupun video
  const Vignette = () => (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        background: `
          linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%),
          linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)
        `,
      }}
    />
  );

  if (isVideo) {
    const publicId = extractCloudinaryPublicId(url);

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/*
         * CldVideoPlayer:
         * - Hide native controls via CSS — kita buat kontrol sendiri
         * - autoPlay hanya saat slide ini aktif
         * - muted wajib untuk browser autoplay policy
         * - loop agar background video tidak berhenti
         */}
        <div
          className="absolute inset-0 [&_.vjs-control-bar]:!hidden [&_.vjs-big-play-button]:!hidden [&_.vjs-loading-spinner]:!hidden"
          style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
          <video
            id={`cld-player-${publicId.replace(/[^a-zA-Z0-9]/g, "-")}`}
            src={url}
            width={1920}
            height={1080}
            // autoPlay={isActive}
            // muted
            // loop
            controls
            className="!absolute !inset-0 !w-full !h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full"
          />
        </div>
        <Vignette />
      </div>
    );
  }

  // Gambar biasa
  return (
    <div className="absolute inset-0">
      <Image
        src={url || fallbackUrl}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      <Vignette />
    </div>
  );
}

export default SlideMedia;
