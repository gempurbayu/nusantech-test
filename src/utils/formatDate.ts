export function getReleaseYear(releaseDate?: string | null): string {
  if (!releaseDate) return "N/A"
  const date = new Date(releaseDate)
  return isNaN(date.getFullYear()) ? "N/A" : String(date.getFullYear())
}

export function formatFullDate(releaseDate?: string | null): string {
  if (!releaseDate) return "N/A"
  const date = new Date(releaseDate)
  if (isNaN(date.getTime())) return "N/A"
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
