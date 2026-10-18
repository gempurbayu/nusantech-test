import { useQuery } from "@tanstack/react-query"
import { movieApi } from "../api"

export function useMovieDetail(movieId?: string | number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
      if (!movieId) throw new Error("Movie ID is required")
      return movieApi.getMovieDetail(movieId)
    },
    enabled: Boolean(movieId),
  })
}
