import { describe, it, expect } from "vitest"
import { getTmdbImageUrl, getTmdbBackdropUrl } from "@/utils/tmdb"

describe("tmdb image utils", () => {
  describe("getTmdbImageUrl", () => {
    it("builds full image URL with default size (w500)", () => {
      const url = getTmdbImageUrl("/test-poster.jpg")
      expect(url).toBe("https://image.tmdb.org/t/p/w500/test-poster.jpg")
    })

    it("builds image URL with custom size", () => {
      const url = getTmdbImageUrl("/test-poster.jpg", "w300")
      expect(url).toBe("https://image.tmdb.org/t/p/w300/test-poster.jpg")
    })

    it("returns placeholder when path is null or undefined", () => {
      expect(getTmdbImageUrl(null)).toContain("placehold.co")
      expect(getTmdbImageUrl(undefined)).toContain("placehold.co")
      expect(getTmdbImageUrl("")).toContain("placehold.co")
    })
  })

  describe("getTmdbBackdropUrl", () => {
    it("builds full backdrop URL with default size (original)", () => {
      const url = getTmdbBackdropUrl("/test-backdrop.jpg")
      expect(url).toBe("https://image.tmdb.org/t/p/original/test-backdrop.jpg")
    })

    it("returns placeholder when path is null or undefined", () => {
      expect(getTmdbBackdropUrl(null)).toContain("placehold.co")
      expect(getTmdbBackdropUrl(undefined)).toContain("placehold.co")
      expect(getTmdbBackdropUrl("")).toContain("placehold.co")
    })
  })
})
