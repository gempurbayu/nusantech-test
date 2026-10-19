import { describe, it, expect, vi, beforeEach } from "vitest"
import { searchApi } from "@/features/search/api/searchApi"
import { axiosClient } from "@/lib/axios"

vi.mock("@/lib/axios", () => ({
  axiosClient: {
    get: vi.fn(),
  },
}))

describe("searchApi", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns empty results immediately without network call if query is empty or whitespace", async () => {
    const res1 = await searchApi.searchMovies({ query: "" })
    expect(res1).toEqual({
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    })
    expect(axiosClient.get).not.toHaveBeenCalled()

    const res2 = await searchApi.searchMovies({ query: "   " })
    expect(res2.results).toEqual([])
    expect(axiosClient.get).not.toHaveBeenCalled()
  })

  it("calls /search/movie with query and page params when query is valid", async () => {
    const mockData = {
      page: 1,
      results: [{ id: 550, title: "Fight Club" }],
      total_pages: 1,
      total_results: 1,
    }
    ;(axiosClient.get as any).mockResolvedValueOnce({ data: mockData })

    const result = await searchApi.searchMovies({ query: "Fight Club", page: 1 })

    expect(axiosClient.get).toHaveBeenCalledWith("/search/movie", {
      params: {
        query: "Fight Club",
        page: 1,
      },
    })
    expect(result).toEqual(mockData)
  })
})
