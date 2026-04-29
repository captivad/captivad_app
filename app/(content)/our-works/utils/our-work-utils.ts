// ─────────────────────────────────────────────────────────────────────────────
// UTILS — deteksi tipe media
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deteksi apakah URL adalah video berdasarkan ekstensi atau path Cloudinary.
 * Cloudinary video URL mengandung "/video/upload/" atau ekstensi video umum.
 */
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExts = /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i;
  const cloudinaryVideo = /\/video\/upload\//i;
  return videoExts.test(url) || cloudinaryVideo.test(url);
}

/**
 * Ekstrak public_id dari Cloudinary URL.
 * Dibutuhkan CldVideoPlayer yang menerima public_id, bukan full URL.
 * Contoh: "https://res.cloudinary.com/demo/video/upload/v123/my-video.mp4"
 *      → "my-video"
 */
function extractCloudinaryPublicId(url: string): string {
  try {
    const clean = url.split("?")[0];
    const uploadIdx = clean.indexOf("/upload/");
    if (uploadIdx === -1) return url;
    let path = clean.slice(uploadIdx + "/upload/".length);
    // Hapus versi (v123456789/)
    path = path.replace(/^v\d+\//, "");
    // Hapus ekstensi
    path = path.replace(/\.[^/.]+$/, "");
    return path;
  } catch {
    return url;
  }
}

export { isVideoUrl, extractCloudinaryPublicId };
