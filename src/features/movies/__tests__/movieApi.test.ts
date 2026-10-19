import { describe, it, expect, vi, beforeEach } from "vitest"
import { movieApi } from "@/features/movies/api/movieApi"
import { axiosClient } from "@/lib/axios"

vi.mock("@/lib/axios", () => ({
  axiosClient: {
    get: vi.fn(),
  },
}))

describe("movieApi", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("calls getMoviesByCategory with correct category and page", async () => {
    const mockData = { page: 1, results: [], total_pages: 5, total_results: 100 }
    ;(axiosClient.get as any).mockResolvedValueOnce({ data: mockData })

    const result = await movieApi.getMoviesByCategory("popular", 2)

    expect(axiosClient.get).toHaveBeenCalledWith("/movie/popular", {
      params: { page: 2 },
    })
    expect(result).toEqual(mockData)
  })

  it("calls getMovieDetail with append_to_response parameter", async () => {
    const mockDetail = { id: 123, title: "Interstellar" }
    ;(axiosClient.get as any).mockResolvedValueOnce({ data: mockDetail })

    const result = await movieApi.getMovieDetail(123)

    expect(axiosClient.get).toHaveBeenCalledWith("/movie/123", {
      params: {
        append_to_response: "credits,videos",
      },
    })
    expect(result).toEqual(mockDetail)
  })

  it("calls getMovieVideos and returns results array", async () => {
    const mockVideos = [{ id: "v1", key: "xyz", name: "Trailer", site: "YouTube" }]
    ;(axiosClient.get as any).mockResolvedValueOnce({
      data: { results: mockVideos },
    })

    const result = await movieApi.getMovieVideos(123)

    expect(axiosClient.get).toHaveBeenCalledWith("/movie/123/videos")
    expect(result).toEqual(mockVideos)
  })

  it("returns empty array if results is missing in getMovieVideos response", async () => {
    ;(axiosClient.get as any).mockResolvedValueOnce({ data: {} })

    const result = await movieApi.getMovieVideos(999)
    expect(result).toEqual([])
  })
})
