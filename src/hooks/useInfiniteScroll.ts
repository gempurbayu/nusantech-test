import { useEffect, useRef } from "react"

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  threshold?: number // Distance from bottom in px
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 300,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || isLoading) return

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollHeight - scrollPosition <= threshold) {
        onLoadMore()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasMore, isLoading, onLoadMore, threshold])

  return { sentinelRef }
}
