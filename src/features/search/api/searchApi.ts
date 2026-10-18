import { axiosClient } from "@/lib/axios"
import type { PaginatedResponse } from "@/types/api.types"
import type { Movie } from "@/features/movies/types"
import type { SearchMovieParams } from "../types"

export const searchApi = {
  searchMovies: async ({
    query,
    page = 1,
  }: SearchMovieParams): Promise<PaginatedResponse<Movie>> => {
    if (!query.trim()) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      }
    }

    const response = await axiosClient.get<PaginatedResponse<Movie>>(
      "/search/movie",
      {
        params: {
          query,
          page,
        },
      }
    )
    return response.data
  },
}
