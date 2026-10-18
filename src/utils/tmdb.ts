const IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p"

export type ImageSize = "w200" | "w300" | "w500" | "w780" | "original"

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: ImageSize = "w500"
): string {
  if (!path) {
    return "https://placehold.co/500x750/1e293b/94a3b8?text=No+Poster"
  }
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export function getTmdbBackdropUrl(
  path: string | null | undefined,
  size: ImageSize = "original"
): string {
  if (!path) {
    return "https://placehold.co/1280x720/0f172a/334155?text=No+Backdrop"
  }
  return `${IMAGE_BASE_URL}/${size}${path}`
}
