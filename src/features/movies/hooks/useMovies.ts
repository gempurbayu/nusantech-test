import { useInfiniteQuery } from "@tanstack/react-query"
import { movieApi } from "../api"
import type { MovieCategory } from "../types"

export function useMovies(category: MovieCategory) {
  return useInfiniteQuery({
    queryKey: ["movies", category],
    queryFn: ({ pageParam = 1 }) => movieApi.getMoviesByCategory(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
  })
}
