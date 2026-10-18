import { axiosClient } from "@/lib/axios"
import type { PaginatedResponse } from "@/types/api.types"
import type { Movie, MovieCategory, MovieDetail } from "../types"

export const movieApi = {
  getMoviesByCategory: async (
    category: MovieCategory,
    page: number = 1
  ): Promise<PaginatedResponse<Movie>> => {
    const response = await axiosClient.get<PaginatedResponse<Movie>>(
      `/movie/${category}`,
      {
        params: { page },
      }
    )
    return response.data
  },

  getMovieDetail: async (id: number | string): Promise<MovieDetail> => {
    const response = await axiosClient.get<MovieDetail>(`/movie/${id}`, {
      params: {
        append_to_response: "credits",
      },
    })
    return response.data
  },
}
