import { useInfiniteQuery } from "@tanstack/react-query"
import { searchApi } from "../api"

export function useMovieSearch(query: string) {
  const trimmed = query.trim()

  return useInfiniteQuery({
    queryKey: ["search-movies", trimmed],
    queryFn: ({ pageParam = 1 }) =>
      searchApi.searchMovies({ query: trimmed, page: pageParam }),
    initialPageParam: 1,
    enabled: trimmed.length > 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
  })
}
